<?
/**
 * Получаем JSON-строку с ником юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$block_id = $data['block_id'];

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

$query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $block_id . "'");

$questions = array();

while( $row = mysqli_fetch_assoc($query) ) {
    $id = $row['q'];
    $questions[$id] = $row;
}

foreach ($questions as &$question) {
    $question['answers'] = array();

    $query = mysqli_query($link, "SELECT * FROM answers WHERE question_id = '" . $question['id'] . "'");

    while( $row = mysqli_fetch_assoc($query) ) {
        array_push($question['answers'], $row);
    }
}

unset($question);

print(json_encode($questions));