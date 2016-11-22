<?

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

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

$query = mysqli_query($link, "SELECT id,
                                     email,
                                     nickname,
                                     visit,
                                     block,
                                     page,
                                     suits,
                                     date_reg,
                                     date_v1,
                                     date_v2,
                                     date_v3,
                                     is_admin,
                                     is_right FROM users WHERE id = '" . $id . "'");

$user = mysqli_fetch_assoc($query);

if ($user['date_v1'] != null) {
//    $user['diff_v1_v2'] = "hello";
    $now = new DateTime(date("Y-m-d"));
    $date_v2 = new DateTime($user['date_v2']);
    $date_v3 = new DateTime($user['date_v3']);

    $user['diff_v2'] = date_diff($now, $date_v2)->format('%R%a');
    $user['diff_v3'] = date_diff($now, $date_v3)->format('%R%a');
}

echo(json_encode($user));