<?php

$data = json_decode(file_get_contents('php://input'), true);

$user = $data["user"];

/*
 * Подключаемся к базе данных
 */
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/main.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/db-connect.php');

/*
 * Проверяем, установлено ли соединение;
 * Получаем $connect из db-connect.php
 */
if (!$connect) {
    die(json_encode("Not found!"));
}

if ($user['page'] == 35) {
    $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'hivknow' AND user_id = '" . $user['id'] . "'");
    $row = mysqli_fetch_assoc($query);

    $result += $row['value'];

    $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'condom' AND user_id = '" . $user['id'] . "'");
    $row = mysqli_fetch_assoc($query);

    $result += $row['value'];
    
    die($result . "");
}
