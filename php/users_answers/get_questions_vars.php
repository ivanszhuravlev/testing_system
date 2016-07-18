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

$result = array();

$query = mysqli_query($link, "SELECT id, name, s, q, v FROM questions");

while ( $row = mysqli_fetch_assoc($query) ) {
    $v = $row['v'] ? '_v' . $row['v'] : '_b';

    if ($row['q'] / 10 < 1) {
        $q = '0' . $row['q'];
    } else {
        $q = $row['q'];
    }

    $result[$row['s'] . $q . $row['name']] = [
        "var" => $row['name'] . '_s' . $row['s'] . '_q' . $row['q'] . $v,
        "id"  => $row['id']
    ];
}


$query = mysqli_query($link, "SELECT id, variable FROM answers");

$test = array();

while ( $row = mysqli_fetch_assoc($query) ) {
    if ($row['variable']) {
        preg_match('/([A-Za-z0-9]+)_\w(\d{1,2})\w(\d{1,2})(\w{1,2})/', $row['variable'], $matches);

        $v = $matches[4] ? '_v' . $matches[4] : '_b';

        if ($matches[3] / 10 < 1) {
            $q = '0' . $matches[3];
        } else {
            $q = $matches[3];
        }

        $result[$matches[2] . $q . $matches[1]] = [
            "var" => $matches[1] . '_s' . $matches[2] . '_q' . $matches[3] . $v, 
            "id"  => $row['id']
        ];
    }
}

print(json_encode($result));