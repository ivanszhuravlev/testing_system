<?
/**
 * Получаем JSON-строку с ником юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$ids = $data['ids'];

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

$blocks = array();

foreach ($ids as $id) {
    $query = mysqli_query($link, "SELECT * FROM pages WHERE id = '" . $id . "' AND type = 'block'");

    $block = mysqli_fetch_assoc($query);

    array_push($blocks, $block);
}

print(json_encode($blocks));
