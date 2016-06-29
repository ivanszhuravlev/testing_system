<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$answers = $data["answers"];
$user_id  = $data["user_id"];

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

foreach ($answers as $answer) {
    $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                          "user_id = '" . $user_id . "'," .
                          "question_id = '" . $answer['id'] . "'," .
                          "value = '" . $answer['value'] . "'"
                         );
}
