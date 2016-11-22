<?
/**
 * Получаем JSON-строку с email-ом юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];

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

$query = mysqli_query($link, "SELECT email FROM users WHERE email = '" . $email . "'");

$user = mysqli_fetch_assoc($query);

/**
 * Код ошибки:
 * 0 - email не найден
 * 1 - email уже занят
 * 2 - email не email
 */
if (filter_var($email, FILTER_VALIDATE_EMAIL)==false) {
	die ("2");
}
elseif (is_null($user)) {
    die("0");
} 
else {
    die("1");
}
