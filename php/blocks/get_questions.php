<?
/**
 * Получаем JSON-строку с ником юзера
 */
$data = json_decode(file_get_contents('php://input'), true);

$content_id = $data['content_id'];
$block_id   = $data['block_id'];
$page_id    = $data['page_id'];
$user       = $data['user'];

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
        if ($user['visit'] == 1) {
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
        } else {
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
                                                                 AND page = '" . $page_id . "'
                                                                 AND v = 1");
        }
        break;
    case "6":
        if ($user['visit'] == 1) {
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
        } else {
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
                                                                 AND page = '" . $page_id . "' 
                                                                 AND v = 1");
        }
        break;
    default:
        if ($user['visit'] == 1) {
            $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND page = '" . $page_id . "'");
        } else {
            $query = mysqli_query($link, "SELECT * FROM questions WHERE s = '" . $content_id . "' AND page = '" . $page_id . "' AND v = 1");
        }
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

    if ($row['q'] % 10 == $row['q']) {
        $id = "0" . $row['q'];
    } else {
        $id = "" . $row['q'];
    }

    if (array_key_exists(/*"" . $row['q']*/ $id, $questions) ) {
//        $id = $row['q'];
        while (  array_key_exists($id . "", $questions) ) {
//            $id = (float) $id + 0.01;
            $id = $row['q'] % 10 == $row['q'] ? "0" . ($id + 0.01) : ($id + 0.01) . "";
        }
//        die(var_dump($id));
    } else {
        $id = $row['q'] % 10 == $row['q'] ? "0" . $row['q'] : $row['q'] . "";
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
