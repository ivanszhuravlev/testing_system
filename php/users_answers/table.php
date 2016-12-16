<?

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

$uids = array();

$query = mysqli_query($link, "SELECT DISTINCT user_id FROM user_answers");

while ( $row = mysqli_fetch_array($query) ) {
    array_push($uids, $row[0]);
	
}
echo "<pre>";
print_r($uids);
echo "</pre>";

foreach ($uids as $id) {
    $query = mysqli_query($link, "SELECT question_id, value, answer_id, text_value, visit
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
        
        $visit = $row['visit'];

        $result[$id][$qid][$visit] = [
            "value" => $value
        ];
    }
}

print_r($result);
?>