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


for($i = 1; $i <= 3; $i++) {
    $query = mysqli_query($link, "SELECT id, name, s, q, v FROM questions");

    while ( $row = mysqli_fetch_assoc($query) ) {

        if ($row['q'] / 10 < 1) {
            $q = '0' . $row['q'];
        } else {
            $q = $row['q'];
        }
        
        if ($i == 1) {
            $v = $row['v'] ? 'v' . $i : 'b';
            $result[$i . $row['s'] . $q . $row['name']] = [
                "var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
                "id"    => $row['id'],
                "visit" => $i
            ];
			 $question_vars[$i . $row['s'] . $q . $row['name']] = [
                "var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
                "id"    => $row['id'],
                "visit" => $i
            ];
        } else {
            if ($row['v']) {
                $v = 'v' . $i;
                $result[$i . $row['s'] . $q . $row['name']] = [
                    "var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
                    "id"    => $row['id'],
                    "visit" => $i
                ];
				$question_vars[$i . $row['s'] . $q . $row['name']] = [
                    "var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
                    "id"    => $row['id'],
                    "visit" => $i
                ];
            }
        }
    }
	
}
echo "<pre>";
foreach ($question_vars as $var ) {
 print_r ($var['var']);echo "<br>";
 }
echo "</pre>";


for($i = 1; $i <= 3; $i++) {

    $query = mysqli_query($link, "SELECT id, variable FROM answers");

    $test = array();

    while ( $row = mysqli_fetch_assoc($query) ) {

        if ($row['variable']) {
            preg_match('/([A-Za-z0-9]+)_\w(\d{1,2})\w(\d{1,2})(\w{1,2})/', $row['variable'], $matches);

            $v = $matches[4] ? $matches[4] : 'b';

            if ($matches[3] / 10 < 1) {
                $q = '0' . $matches[3];
            } else {
                $q = $matches[3];
            }

            if ($i == 1) {
                $v = $matches[4] ? 'v' . $i : 'b';
                $result[$i . $matches[2] . $q . $matches[1]] = [
                    "var"   => $matches[1] . '_s' . $matches[2] . 'q' . $matches[3] . $v, 
                    "id"    => $row['id'],
                    "visit" => $i,
                    "is_multiple" => true
                ];
            } else {
                if ($matches[4]) {
                    $v = 'v' . $i;
                    $result[$i . $matches[2] . $q . $matches[1]] = [
                        "var"   => $matches[1] . '_s' . $matches[2] . 'q' . $matches[3] . $v, 
                        "id"    => $row['id'],
                        "visit" => $i,
                        "is_multiple" => true
                    ];
                }
            }
        }
    }
}

?>