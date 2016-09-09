<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$answers = $data["answers"];
$mult_answers = $data["mult_answers"];
$user_id  = $data["user_id"];
$block_id = $data["block_id"];

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

    /*
     * Обрабатываем опцию doesnt_suit, т.е.
     * Блокируем пользователю доступ к опроснику.
     */
    if (strpos($answer['options'], 'doesnt_suit') === 0) {
        $doesnt_suit = mysqli_query($link, "UPDATE users SET suits = '0' WHERE id = '" . $user_id . "'");
    }

    /*
     * Обрабатываем опцию pass_value_block_page, т.е.
     * Переходим на блок block и страницу page, подставляя
     * значения value в пропускаемые вопросы.
     */
    if (strpos($answer['options'], 'pass') === 0) {

        /*
         * Парсим опцию сохраняем результат в массив $parsed:
         ** value - $parsed[1],
         ** block - $parsed[2],
         ** page  - $parsed[3].
         */
        preg_match('/pass_(\d+)_(\d+)_(\d+)/', $answer['options'], $parsed);
        $pass = mysqli_query($link, "UPDATE users SET block = " . $parsed[2] . ", page = " . $parsed[3] . " WHERE id = '" . $user_id . "'");

        /*
         * Берем значение q текущего вопроса
         */
        $current_q = mysqli_query($link, "SELECT q FROM questions WHERE id = '" . $answer['id'] . "'");

        $current_q = mysqli_fetch_array($current_q);

        $last_page_q = array();

        /*
         * Берем значения q вопросов до того, на который переходим
         */
        if ($parsed[3] == 1) {
            $prev_q = mysqli_query($link, "SELECT q FROM questions WHERE s = '" . ($parsed[2] - 1) . "'");
        } else {
            $prev_q = mysqli_query($link, "SELECT q FROM questions WHERE s = '" . $parsed[2] . "' AND page = '" . ($parsed[3] - 1) . "'");
        }

        /*
         * Собираем и сортируем массив с номерами вопросов
         */
        while ( $row = mysqli_fetch_array($prev_q) ) {
            array_push($last_page_q, $row[0]);
        }

        sort($last_page_q);

        /*
         * Берем id вопросов, значения которых будем заполнять автоматически
         */
        $ids = mysqli_query($link, "SELECT id FROM questions WHERE s = '" . $block_id . "' AND (q > '" . $current_q[0] . "' AND q <= '" . $last_page_q[count($last_page_q) - 1] . "')");

        /*
         * Подставляем значения
         */
        while ( $id = mysqli_fetch_array($ids) ) {
            $auto_answers = mysqli_query($link, "INSERT INTO user_answers SET " .
                              "user_id = '" . $user_id . "'," .
                              "question_id = '" . $id[0] . "'," .
                              "value = '" . $parsed[1] . "'"
                             );
        }

        /*
         * Возвращаем ключ "pass", означающий, что
         * в контроллере далее следует переход.
         */
        print("pass");
    }
    
    if ($block_id == 8) {
        $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                              "user_id = '" . $user_id . "'," .
                              "question_id = '" . $answer['id'] . "'," .
                              "value = '" . $answer['value'] . "'"
                             );
    } else {
        $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                              "user_id = '" . $user_id . "'," .
                              "question_id = '" . $answer['id'] . "'," .
                              "value = '" . $answer['value'] . "'"
                             );
    }
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