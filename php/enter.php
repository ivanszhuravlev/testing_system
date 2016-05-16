<?php

const CONNECTION_FAILED = "1",
      NO_EMAIL = "2",
      WRONG_PASS = "3";
      //SUCCESS = "0";

/**
 * Получаем JSON-строку с mail-ом и паролем
 */
$user = json_decode(file_get_contents('php://input'), true);

$email = $user["email"];
$password = $user["password"];
/**
 * Подключаемся к базе данных
 */
include_once($_SERVER['DOCUMENT_ROOT'] . '/config/main.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/db-connect.php');

/**
 * Проверяем, установлено ли соединение;
 * Получаем $connect из db-connect.php
 */
if (!$connect) {
    die(CONNECTION_FAILED);
}

$query = mysqli_query($link, "SELECT id, password FROM users WHERE email = '" . $email . "'");

$guest = mysqli_fetch_assoc($query);

if (!$guest) {
    die(NO_EMAIL);
}

if (password_verify($password, $guest["password"])) {
    session_start();
    $_SESSION['uid'] = uniqid('ang_');
    print($_SESSION['uid']);
} else {
    die(WRONG_PASS);
}
