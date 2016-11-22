<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$uid      = $data["uid"];
$is_right = $data["is_right"];

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

$query = mysqli_query($link, "UPDATE users SET is_right = '" . $is_right . "' WHERE id = '" . $uid . "'");

$query = mysqli_query($link, "SELECT is_right FROM users WHERE id = '" . $uid . "'");

$result = mysqli_fetch_assoc($query);

echo($result['is_right']);