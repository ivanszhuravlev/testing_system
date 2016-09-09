<?php

$data = json_decode(file_get_contents('php://input'), true);

$block_id = $data["block_id"];
$page_id = $data["page_id"];
$mult_answers = $data["answers"];
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

foreach ($mult_answers as $id=>$answer) {
//    $query = mysqli_query($link, "SELECT * FROM user_answers WHERE answer_id = " . $id . " AND user_id = " . $user['id'] . " AND visit = " . $user['stage']);
//    $row = mysqli_fetch_assoc($query);
    array_push($answers, $id);
}

$result = array();

include_once($_SERVER['DOCUMENT_ROOT'] . '/php/questions/calc_interv.php');

die(json_encode($result));