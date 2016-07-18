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

$result = array();

$query = mysqli_query($link, "SELECT DISTINCT user_id FROM user_answers");

while ( $row = mysqli_fetch_array($query) ) {
    array_push($result, $row[0]);
}

print(json_encode($result));