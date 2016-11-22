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

 $query = mysqli_query($link, "UPDATE users SET
            date_v" . $user['visit'] . " = CURDATE()
            WHERE id = '" . $user['id'] . "'");

