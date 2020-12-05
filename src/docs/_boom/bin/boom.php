<?php
require_once "vendor/autoload.php";

define("STATIC_EXCLUDE", array('.DS_Store'));

function get_config($root, $env)
{
    $configPath  = $root."/_boom/config/config.$env.json";
    return json_decode(file_get_contents($configPath), true);
}

function get_page($root, $qry, $env)
{
    $config = get_config($root, $env);

    if ($f = get_file($root, $qry)) {
        if ($res = render_page($root, $f, $config['data'])) {
            echo $res;
            die;
        }
    }
    http_response_code(404);
    die("Page not found");
}

function get_file($root, $qry) {

    if (substr($qry, -1) === '/') $qry .= "index";

    if (file_exists($f = $root . $qry . (substr($qry, -3, 3) != ".md" ? ".md" : ""))) {
        return $f;
    } else if (file_exists($f = $root . $qry . "/index.html.md")) {
        return $f;
    } else {
        return false;
    }
}

function render_page($root, $file, $config = [], $build = false)
{
    if ($txt = file_get_contents($file)) {

        $txt = process_config($txt, $config);

        $data = [
            'CONFIG' => $config
        ];

        $data = array_merge($data, get_sections($txt));

        if ($data['META']['includes']) {
            $incl = process_includes($root, $data['META']['includes'], $config);
            $data = array_merge($data, $incl);
        }

        if (isset($data['META']['build'])) {
            if ($build && !$data['META']['build']) {
                return false;
            }
        }

        $base = $data['META']['base'];

        if (isset($base)) {
            $loader = new \Twig\Loader\FilesystemLoader([$root .  "/_boom/layouts"]);
            $twig = new \Twig\Environment($loader);
            $filter = new \Twig\TwigFilter('md', 'filter_md');
            $twig->addFilter($filter);
            return $twig->render($base, ['data' => $data]);
        }
    }
    return false;
}

function process_config($txt, $config)
{
    return preg_replace_callback('/{% (\w*) %}/', function ($match) use ($config) {
        return $config[$match[1]];
    }, $txt);
}
/*
Example:
includes = path/to/file1.md section1 section2

includes[] = path/to/file1.md section1 section2
includes[] = path/to/file2.md section1
*/
function process_includes($root, $includes, $config = [])
{
    $incl = [];
    if (!is_array($includes)) {
        $includes = [$includes];
    }
    foreach ($includes as $value) {
        if ($pos = strpos($value, " ")) {
            $file = substr($value, 0, $pos);
            $sections = substr($value, $pos + 1);
            if (isset($file) && isset($sections)) {
                $filePath = $root . ($value[0] == '/' ?: '/') . $file;
                if ($txt = file_get_contents($filePath)) {
                    $sections = explode(" ", $sections);
                    if (!empty($config)) {
                        $txt = process_config($txt, $config);
                    }
                    foreach ($sections as $section) {
                        $section = trim($section);
                        $incl[$section] = get_sections($txt)[$section];
                    }
                }
            }
        }
    }
    return $incl;
}

function filter_md($string)
{
    return ParsedownExtra::instance()->line($string);
}

function get_sections($txt)
{
    $count = preg_match_all('/```(\w*)(\ raw)? (\w*)/', $txt, $matches, PREG_OFFSET_CAPTURE | PREG_SET_ORDER);

    $res = [];

    if ($count > 0) {
        for ($i = 0; $i < $count; $i++) {
            $format = $matches[$i][1][0];
            $variance = trim($matches[$i][2][0]);
            $tag = $matches[$i][3][0];

            $start = $matches[$i][0][1] + strlen($matches[$i][0][0]) + 1;
            if ($i < $count - 1) {
                $len = $matches[$i + 1][0][1] - $start;
                $s = substr($txt, $start, $len);
            } else {
                $s = substr($txt, $start);
            }
            //clean tail
            $s = substr_replace($s, "", strrpos($s, '```'));

            if ($variance != 'raw') {
                $s = process_format($format, $s);
            }

            $res[$tag] = $s;
        }
    }

    return $res;
}

function process_format($format, $txt)
{
    switch ($format) {
        case 'MD':
            return ParsedownExtra::instance()->text($txt);
        case 'INI':
            return parse_ini_string($txt, true, INI_SCANNER_TYPED);
        case 'JSON':
            return json_decode($txt, true, 512, JSON_THROW_ON_ERROR);
        case 'HTML':
        default:
            return $txt;
    }
}

function build($root, $env, $dryRun = false)
{
    $config = get_config($root, $env);

    $output = $config['build']['output'];

    build_dir($root, '', $output, $config, $dryRun);
}

function build_dir($root, $dir, $pathBuild, $config, $dryRun)
{
    $files = scandir("$root/$dir");

    foreach ($files as $file) {
        if ($file == "." || $file == "..") continue;
        $d = $dir != '' ? "$dir/" : '';
        $pb = $pathBuild . "/" . $d;

        if (is_dir($root . "/" . $d . $file)) {

            if (substr($file, 0, 1) == '_') {
                continue;
            }
            if (!file_exists($pb . $file) && !$dryRun) {
                mkdir($pb . $file, 0755, true);
            }
            build_dir($root, $d . $file, $pathBuild, $config, $dryRun);

        } else {

            if (!file_exists($pb) && !$dryRun) {
                mkdir($pb, 0755, true);
            }

            $ext = substr($file, strrpos($file, ".") + 1);

            $inputFile = $root . "/" . $d . $file;
            $outputFile = $pb . ($ext == 'md' ? substr($file, 0, strrpos($file, ".")) : $file);

            if ($ext == 'md') {
                if ($page = render_page($root, $inputFile, $config['data'], true)) {

                    if (file_exists($outputFile)) {
                        $md5In = md5($page);
                        $md5Out = md5_file($outputFile);
                        if ($md5In == $md5Out) {
                            continue;
                        }
                    }

                    if (!$dryRun) {
                        file_put_contents($outputFile, $page);
                    }
                    _e('UPDATE MD: ' . $outputFile);
                }
            } else {
                $ext = substr($file, strrpos($file, "."));
                if (in_array($ext, STATIC_EXCLUDE)) {
                    continue;
                }

                $timeIn = filemtime($inputFile);

                if (file_exists($outputFile)) {
                    $timeOut = filemtime($outputFile);
                    if ($timeIn <= $timeOut) {
                        continue;
                    }
                }

                if (!$dryRun) {
                    copy($inputFile, $outputFile);
                    touch($outputFile, $timeIn);
                }
                _e('UPDATE COPY: ' . $outputFile);
            }

        }
    }
}

function _e($s, $v = "", $cli = true)
{
    if (is_array($s)) {
        print_r($s);
    } else {
        echo "$s" . ($v !== "" ? " : " : "") . $v  . ($cli ? "\n" : "<br>");
    }
}
