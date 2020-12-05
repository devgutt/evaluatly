<?php

$root = realpath(__DIR__."/..");

require_once "./bin/boom.php";

// $DRY_RUN = true;

build($root, 'prod', $DRY_RUN);


