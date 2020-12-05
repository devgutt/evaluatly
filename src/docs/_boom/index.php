<?php

$root = realpath(__DIR__."/..");

require_once "./bin/boom.php";

get_page($root, $_SERVER["REDIRECT_URL"], 'dev');
