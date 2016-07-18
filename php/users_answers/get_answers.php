<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$uids = $data["ids"];

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

foreach ($uids as $id) {
    $result[$id] = array();

    $query = mysqli_query($link, "SELECT question_id, value, answer_id, text_value 
                                  FROM user_answers 
                                  WHERE user_id = '" . $id . "'");
    while ( $row = mysqli_fetch_assoc($query) ) {
        if ($row['text_value']) {
            $value = $row['text_value'];
        } else {
            $value = $row['value'];
        }

        if ($row['answer_id']) {
            $qid = $row['answer_id'];
        } else {
            $qid = $row['question_id'];
        }

        $result[$id][$qid] = $value;
    }
}

print(json_encode($result));