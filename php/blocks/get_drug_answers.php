<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$user = $data["user"];

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

$result = array();

$query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '38' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");

$row = mysqli_fetch_assoc($query);

$result['idrug_q5'] = $row['value'];

$query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '75' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");

$row = mysqli_fetch_assoc($query);

$result['idrug_q6'] = $row['value'];

die(json_encode($result));
