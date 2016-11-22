<?
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

$query = mysqli_query($link, "SELECT * FROM pages WHERE type = 'block'");

while ( $row = mysqli_fetch_assoc($query) ) {
    array_push($blocks, $row);
}

print(json_encode($blocks));

