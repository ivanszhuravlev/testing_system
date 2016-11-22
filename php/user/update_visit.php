<?php
/**
 * Получаем JSON-строку с вопросом
 */
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

switch($user['visit']) {
    case 1:
        $query = mysqli_query($link, "UPDATE users SET 
            date_v1 = CURDATE(),
            date_v2 = DATE_ADD(CURDATE(),INTERVAL 1 DAY),
            date_v3 = DATE_ADD(CURDATE(),INTERVAL 2 DAY),
            block = 1,
            page = 1,
            visit = 2,
            is_right = NULL WHERE id = '" . $user['id'] . "'");
        break;
    case 2:
        $query = mysqli_query($link, "UPDATE users SET
            block = 1,
            page = 1,
            visit = 3,
            is_right = NULL WHERE id = '" . $user['id'] . "'");
        break;
    case 3:
        $query = mysqli_query($link, "UPDATE users SET
            block = 1,
            page = 1,
            visit = 999,
            is_right = NULL WHERE id = '" . $user['id'] . "'");
        break;
}

