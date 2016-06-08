<?

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

$query = mysqli_query($link, "SELECT email, nickname, stage, block FROM users WHERE id = '" . $id . "'");

$user = mysqli_fetch_assoc($query);

echo(json_encode($user));