<?
$data = json_decode(file_get_contents('php://input'), true);

$page_id = $data['page_id'];

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

$query = mysqli_query($link, "SELECT text FROM right_answers WHERE page = '" . $page_id . "'");

$right_answer = mysqli_fetch_assoc($query);
//iconv ('windows-1251', 'utf-8', $right_answer['text']);

print($right_answer['text']);
