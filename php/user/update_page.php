<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$user     = $data["user"];
$block_id = $data["block_id"];

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

//$query = mysqli_query($link, "SELECT DISTINCT page FROM questions WHERE s = '" . $block_id . "'");

$query = mysqli_query($link, "SELECT pages_num FROM pages WHERE id = " . $block_id . "");

$block = mysqli_fetch_assoc($query);

//$pages = array();
//
//while ( $row = mysqli_fetch_assoc($query) ) {
//    array_push($pages, $row);
//}

$pages_num = $block_id == 8 ? 41 : $block['pages_num'];

if ($user['page'] < $pages_num) {
    $query = mysqli_query($link, "UPDATE users SET page = page + 1 WHERE id = '" . $user['id'] . "'");
} else {
    $query = mysqli_query($link, "UPDATE users SET block = block + 1, page = 1 WHERE id = '" . $user['id'] . "'");
}

$query = mysqli_query($link, "SELECT block, page FROM users WHERE id = '" . $user['id'] . "'");

$result = mysqli_fetch_assoc($query);

echo(json_encode($result));