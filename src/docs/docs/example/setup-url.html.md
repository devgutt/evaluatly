```INI META
title = Example Getting Started
base = raw.html

```

```HTML RAW
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>My Page</title>
</head>
<body>
    <script src="{% cdn %}/dist/evaluatly-{% evaluatly_version %}.js"></script>
    <script>
        Evaluatly.loadUrl('/docs/example/story.json');
    </script>
</body>
</html>
```
