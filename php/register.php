<?php
/**
 * Получаем JSON-строку с данными юзера
 */
$user = json_decode(file_get_contents('php://input'), true);

$nickname        = trim($user['nickname']);
$email           = trim($user['email']);
$password        = trim($user['password']);
$repeat_password = trim($user['repeat_password']);

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

if ($nickname == "") {
    die(json_encode("Nickname field is empty"));
}

if ($email == "") {
    die(json_encode("Email field is empty"));
}

if ($password == "" && $repeat_password == "") {
    die(json_encode("Password field is empty"));
}

if ($password != $repeat_password) {
    die(json_encode("Different passwords: " . $password . " | " . $repeat_password));
}

$subject = 'Регистрация в программе vPLUS';
$message = 'Уважаемый '.$nickname.'!  Вы успешно зарегистрировались в программе vPLUS.
Ваши данные для входа: 
http://vplus.psy.spbu.ru/enter
Логин:'. $email .'
Пароль:'. $password .'
С уважением, команда разработчиков';

$headers = 'From: no-reply@vplus.psy.spbu.ru' . "\r\n" .
    'Reply-To: admin@vplus.psy.spbu.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($email, $subject, $message, $headers);


$query = mysqli_query($link, "INSERT INTO users SET " .
                      "nickname = '" . $nickname . "'," .
                      "email    = '" . $email . "'," .
                      "date_reg  = CURDATE()," .
                      "password = '" . password_hash($password, PASSWORD_DEFAULT) . "'"
                     );

$query = mysqli_query($link, "SELECT id FROM users WHERE email = '" . $email . "'");

$user = mysqli_fetch_assoc($query);

session_start();

$_SESSION["uid"] = uniqid('ang_');

$response = array(
    "id" => $user["id"],
    "value" => $_SESSION['uid']
);

print(json_encode($response));