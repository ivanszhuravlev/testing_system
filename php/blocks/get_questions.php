<?
/**
 * Получаем JSON-строку с ником юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$content_id = $data['content_id'];
$block_id   = $data['block_id'];
$page_id    = $data['page_id'];

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

switch ($block_id) {
    case "5":
        $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND
                                                            (name = 'sexmale' OR
                                                             name = 'sexfemale' OR
                                                             name = 'sexvag' OR
                                                             name = 'sexvagsafe' OR
                                                             name = 'sexanal' OR
                                                             name = 'sexanalsafe' OR
                                                             name = 'sextalk' OR
                                                             name = 'sexlastsafe' OR
                                                             name = 'steadysexpart' OR
                                                             name = 'hivstatpart' OR
                                                             name = 'conceive')
                                                             AND page = '" . $page_id . "'");
        break;
    case "6":
        $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND
                                                            (name = 'pss1' OR
                                                             name = 'pss2' OR
                                                             name = 'pss3' OR
                                                             name = 'pss4' OR
                                                             name = 'pss5' OR
                                                             name = 'pss6' OR
                                                             name = 'pss7' OR
                                                             name = 'pss8' OR
                                                             name = 'pss9' OR
                                                             name = 'pss10')
                                                             AND page = '" . $page_id . "'");
        break;
    default:
        $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND page = '" . $page_id . "'");
        break;
}

//if ($block_id == '5') {
//    $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND
//                                                            (name = 'sexmale' OR
//                                                             name = 'sexfemale' OR
//                                                             name = 'sexvag' OR
//                                                             name = 'sexvagsafe' OR
//                                                             name = 'sexanal' OR
//                                                             name = 'sexanalsafe' OR
//                                                             name = 'sextalk' OR
//                                                             name = 'sexlastsafe' OR
//                                                             name = 'steadysexpart' OR
//                                                             name = 'hivstatpart' OR
//                                                             name = 'conceive')
//                                                             AND page = '" . $page_id . "'");
//} else {
//    $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND page = '" . $page_id . "'");
//}

$questions = array();

while( $row = mysqli_fetch_assoc($query) ) {
    if ( array_key_exists("0" . $row['q'], $questions) ) {
        $id = $row['q'];
        while (  array_key_exists("0" . $id . "", $questions) ) {
            $id += 0.01;
        }
        $id = $id . "";
    } else {
        $id = $row['q'] . "";
    }

    if ($row['q'] % 10 == $row['q']) {
        $id = "0" . $id;
    }

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
