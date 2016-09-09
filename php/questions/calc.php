<?php
/**
 * Получаем JSON-строку с вопросом
 */
$data = json_decode(file_get_contents('php://input'), true);

$block_id = $data["block_id"];
$page_id = $data["page_id"];
$ids = $data["ids"];
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

$answers = array();

foreach ($ids as $id) {
    $query = mysqli_query($link, "SELECT * FROM user_answers WHERE question_id = " . $id . " AND user_id = " . $user['id'] . " AND visit = " . $user['stage']);
    $row = mysqli_fetch_assoc($query);
    if ($block_id == 8) {
        $answers = $row['value'];
    } else {
        $answers[$id] = $row;
    }
}

$result = array();

if ($block_id == 3 && $page_id == 5) {
    include_once($_SERVER['DOCUMENT_ROOT'] . '/php/questions/calc_hss.php');
}

if ($block_id == 4 && $page_id == 4) {
    include_once($_SERVER['DOCUMENT_ROOT'] . '/php/questions/calc_audit.php');
}

if ($block_id == 4 && $page_id == 7) {
    include_once($_SERVER['DOCUMENT_ROOT'] . '/php/questions/calc_dss.php');
}

if ($block_id == 8) {
    include_once($_SERVER['DOCUMENT_ROOT'] . '/php/questions/calc_interv.php');
}

die(json_encode($result));