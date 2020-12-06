<?php

$root = realpath(__DIR__."/..");

require_once "./bin/boom.php";

// $DRY_RUN = true;

$output = realpath(__DIR__."/../../../docs/docs");

build($root, 'prod', $output, $DRY_RUN);


