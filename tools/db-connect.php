<?php

$link = mysqli_connect($db["server"], $db["username"], $db["password"]) or die (mysqli_connect_error ());

$connect = mysqli_select_db($link, $db["database"]) or die(mysqli_connect_error());

mysqli_set_charset($link, 'utf8');

