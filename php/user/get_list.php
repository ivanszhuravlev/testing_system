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

$users = array();

$query = mysqli_query($link, "SELECT id, nickname, email FROM users");

while ( $row = mysqli_fetch_assoc($query) ) {
    array_push($users, $row);
}

//$users = mysqli_fetch_array($query);

print(json_encode($users));