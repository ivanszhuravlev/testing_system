<?
/**
 * Получаем JSON-строку с ником юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

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

$query = mysqli_query($link, "SELECT id, name, content_id FROM pages WHERE id = '" . $id . "' AND type = 'block'");

$block = mysqli_fetch_assoc($query);

print(json_encode($block));
