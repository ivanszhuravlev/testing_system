<?php
 header("Content-Type: text/html; charset=utf-8");
/**
 * Получаем JSON-строку с вопросом
 */
$question = json_decode(file_get_contents('php://input'), true)["question"];

$answers = $question["answers"];

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

if ($question["name"] == "") {
    die(json_encode("Incorrect/Empty variable"));
}

if (!$question["answers"] && !$question["symbols"]) {
    die(json_encode("Answers field should not be empty"));
}

$query = mysqli_query($link, "SELECT id FROM questions WHERE name = '" . $question["name"] . "' AND
                                                             q = '" . $question["q"] . "'");

$exists = mysqli_fetch_assoc($query);

if (!is_null($exists)) {
    die("Question alredy exists");
}

$query = mysqli_query($link, "INSERT INTO questions SET " .
                      "name = '" . $question["name"] . "'," .
                      "s    = '" . $question["s"] . "'," .
                      "q    = '" . $question["q"] . "'," .
                      "v    = '" . $question["v"] . "'," .
                      "text = '" . $question["text"] . "'"
                     );

$query = mysqli_query($link, "SELECT id FROM questions WHERE text = '" . $question["text"] . "'");

$id = mysqli_fetch_assoc($query)["id"];

if ($question["answers"]) {
    foreach ($answers as $answer) {
        $query = mysqli_query($link, "INSERT INTO answers SET " .
                              "value       = '" . $answer["id"] . "'," .
                              "question_id = '" . $id . "'," .
                              "text        = '" . $answer["text"] . "'"
                             );
    }
} else {
    $query = mysqli_query($link, "INSERT INTO answers SET " .
                          "value       = '-1'," .
                          "question_id = '" . $id . "'," .
                          "text        = ''," .
                          "symbols     = '" . $question["symbols"] . "'"
                         );
}
//
//$query = mysqli_query($link, "SELECT id FROM users WHERE email = '" . $email . "'");
//
//$user = mysqli_fetch_assoc($query);
//
//session_start();
//
//$_SESSION["uid"] = uniqid('ang_');
//
//$response = array(
//    "id" => $user["id"],
//    "value" => $_SESSION['uid']
//);

print(var_dump($id));