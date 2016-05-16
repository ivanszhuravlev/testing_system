<?
/**
 * Получаем JSON-строку с ником юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$nickname = $data['nickname'];

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
    die("Not found!");
}

$query = mysqli_query($link, "SELECT nickname FROM users WHERE nickname = '" . $nickname . "'");

$user = mysqli_fetch_assoc($query);

/**
 * Код ошибки:
 * 0 - никнейм не найден
 * 1 - никнейм уже занят
 */
if (is_null($user)) {
    die("0");
} else {
    die("1");
}
