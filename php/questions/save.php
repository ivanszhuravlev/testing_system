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

$user_query = mysqli_query($link, "SELECT is_admin, visit FROM users WHERE id = '" . $user_id . "'");
$user = mysqli_fetch_assoc($user_query);

foreach ($answers as $answer) {

    $select_question = mysqli_query($link, "SELECT id, variable FROM user_answers WHERE question_id = '" . $answer['id'] . "' AND user_id = " . $user_id . " AND visit = " . $user['visit']);
    $question = mysqli_fetch_assoc($select_question);

    if ($question && $question['variable'] == null && $user['is_admin'] == 1) {
        mysqli_query($link, "DELETE FROM user_answers WHERE question_id = '" . $answer['id'] . "' AND user_id = " . $user_id . " AND visit = " . $user['visit']);
        $select_question = mysqli_query($link, "SELECT id, variable FROM user_answers WHERE question_id = '" . $answer['id'] . "' AND user_id = " . $user_id . " AND visit = " . $user['visit']);
        $question = mysqli_fetch_assoc($select_question);
    }
    
    if ($question == false) {

        /*
         * Обрабатываем опцию doesnt_suit, т.е.
         * Блокируем пользователю доступ к опроснику.
         */
        if (strpos($answer['options'], 'doesnt_suit') === 0) {
            $doesnt_suit = mysqli_query($link, "UPDATE users SET suits = '0' WHERE id = '" . $user_id . "'");
            die("doesnt_suit");
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
                                  "value = '" . $parsed[1] . "'," .
                                  "visit = '" . $user['visit'] . "'"
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
                                  "value = '" . $answer['value'] . "'," .
                                  "visit = '" . $user['visit'] . "'"
                                 );
        } else {
            if ($answer['answer_id']) {
                $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                                      "user_id = '" . $user_id . "'," .
                                      "answer_id = '" . $answer['answer_id'] . "'," .
                                      "text_value = '" . $answer['value'] . "'," .
                                      "visit = '" . $user['visit'] . "'"
                                     );
            } else {
                $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                                      "user_id = '" . $user_id . "'," .
                                      "question_id = '" . $answer['id'] . "'," .
                                      "value = '" . $answer['value'] . "'," .
                                      "visit = '" . $user['visit'] . "'"
                                     );
            }
        }
    }
}

$all_mult_answers = array();

/**
 *
 * Находим все варианты ответов для вопросов с чекбоксами
 *
 */
foreach ($mult_answers as $answer) {
    $query = mysqli_query($link, "SELECT * FROM answers WHERE question_id = '" . $answer['qid'] . "'");

    while ( $row_answer = mysqli_fetch_assoc($query) ) {
        $all_mult_answers[ $row_answer['id'] ] = array(
            'id' => $row_answer['id'],
            'qid' => $row_answer['question_id'],
            'value' => 0
        );
    }
}

foreach ($mult_answers as $answer) {
    $all_mult_answers[ $answer['id'] ] = $answer;
}

foreach ($mult_answers as $answer) {
    $select_question = mysqli_query($link, "SELECT id FROM user_answers WHERE question_id = '" . $answer['qid'] . "' AND user_id = " . $user_id . " AND visit = " . $user['visit']);
    $question = mysqli_fetch_assoc($select_question);

    if ($question) {
        mysqli_query($link, "DELETE FROM user_answers WHERE question_id = '" . $answer['qid'] . "' AND user_id = " . $user_id . " AND visit = " . $user['visit']);
    }
}

foreach ($all_mult_answers as $answer) {
    if (gettype($answer['value']) == 'string') {
        $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                          "user_id = '" . $user_id . "'," .
                          "question_id = '" . $answer['qid'] . "'," .
                          "answer_id = '" . $answer['id'] . "'," .
                          "value = '0'," .
                          "text_value = '" . $answer['value'] . "'," .
                          "visit = '" . $user['visit'] . "'"
                         );
    } else {
        $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                          "user_id = '" . $user_id . "'," .
                          "question_id = '" . $answer['qid'] . "'," .
                          "answer_id = '" . $answer['id'] . "'," .
                          "value = '" . $answer['value'] . "'," .
                          "visit = '" . $user['visit'] . "'"
                         );
    }
}