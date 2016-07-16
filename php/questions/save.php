<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$answers = $data["answers"];
$mult_answers = $data["mult_answers"];
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
//    if (strpos($answer['options'], 'doesnt_suit') == '0') {
//        die(json_encode($answer['options']));
//        $query = mysqli_query($link, "UPDATE users SET suits = '0' WHERE id = '" . $user_id . "'");
//    }
    $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                          "user_id = '" . $user_id . "'," .
                          "question_id = '" . $answer['id'] . "'," .
                          "value = '" . $answer['value'] . "'"
                         );
}


foreach ($mult_answers as $answer) {
    if (gettype($answer['value']) == 'string') {
        $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                          "user_id = '" . $user_id . "'," .
                          "answer_id = '" . $answer['id'] . "'," .
                          "value = '0'," .
                          "text_value = '" . $answer['value'] . "'"
                         );
    } else {
        $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                          "user_id = '" . $user_id . "'," .
                          "answer_id = '" . $answer['id'] . "'," .
                          "value = '" . $answer['value'] . "'"
                         );
    }
}