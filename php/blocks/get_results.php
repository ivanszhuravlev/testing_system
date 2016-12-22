<?php

$data = json_decode(file_get_contents('php://input'), true);

$user = $data["user"];
$page_id = $data["page_id"];

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
switch($page_id) {
    case 35:
        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'hivknow' AND user_id = '" . $user['id'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result += $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'condom' AND user_id = '" . $user['id'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result += $row['value'];
        break;
    case 36:
        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'hss' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result = array();

        $result['hss'] = $row['value'];

        $result['disclosure'] = array();

        $query = mysqli_query($link, "SELECT answer_id FROM user_answers WHERE question_id = '105' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        while( $row = mysqli_fetch_assoc($query) ) {
            array_push($result['disclosure'], $row['answer_id']);
        }
        break;
    case 37:
        $query = mysqli_query($link, "SELECT question_id, value FROM user_answers WHERE question_id >= '42' AND question_id <= '45' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");

        $result['sex'] = array();

        while( $row = mysqli_fetch_assoc($query) ) {
            $result['sex'][$row['question_id']] = $row['value'];
        }

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '82' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['conceive'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '2' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['children'] = $row['value'];
        break;
    case 38:
        $query = mysqli_query($link, "SELECT question_id, value FROM user_answers WHERE question_id >= '42' AND question_id <= '45' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");

        $result['sex'] = array();

        while( $row = mysqli_fetch_assoc($query) ) {
            $result['sex'][$row['question_id']] = $row['value'];
        }

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '38' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['idrug'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '82' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['conceive'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '2' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['children'] = $row['value'];
        break;
    case 39:
        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '38' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['idrug'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '82' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['conceive'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '2' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['children'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '15' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['aidscenter'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '19' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['arvt'] = $row['value'];
        break;
    case 40:
        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '15' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['aidscenter'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE question_id = '19' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['arvt'] = $row['value'];
        break;
    case 41:
        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'audit' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['audit'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'pss' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['pss'] = $row['value'];

        $query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'ss' AND user_id = '" . $user['id'] . "' AND visit = '" . $user['visit'] . "'");
        $row = mysqli_fetch_assoc($query);

        $result['ss'] = $row['value'];
        break;

}

die(json_encode($result));