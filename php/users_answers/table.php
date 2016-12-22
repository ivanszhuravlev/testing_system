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


echo "<table border=1>";
echo "<tr>";
		//выбираем вопросы и формируем шапку таблице
		 $query2 = mysqli_query($link, "SELECT id, name, s, q, v FROM questions");
			 while ( $row = mysqli_fetch_assoc($query2) ) {

				if ($row['q'] / 10 < 1) {
					$q = '0' . $row['q'];
				} else {
					$q = $row['q'];
				}
				
				if ($i == 1) {
					$v = $row['v'] ? 'v' . $i : 'b';           
					 $question_vars[$i . $row['s'] . $q . $row['name']] = [
						"var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
						"id"    => $row['id'],
						"visit" => $i
					];
				} else {
					if ($row['v']) {
						$v = 'v' . $i;
					  
						$question_vars[$i . $row['s'] . $q . $row['name']] = [
							"var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
							"id"    => $row['id'],
							"visit" => $i
						];
					}
				}
			}
			echo "<td>ID\Переменные</td>";
			foreach ($question_vars as $var ) {
				echo "<td>";				
				print_r ($var['id']);
				echo ":";	
				print_r ($var['var']);
				echo "</td>";
			}

echo "</tr>";
foreach ($uids as $id) {	
	//берем каждого пользователя
	echo "<tr><td>".$id."</td>";  
		//берем каждый ID вопроса
		foreach ($question_vars as $var ) 
		{			
		//выбираем вопрос с таким ID из ответов пользователей для каждого пользователя по очереди
			$query = mysqli_query($link, "SELECT question_id, value, answer_id, text_value, visit
										  FROM user_answers 
										  WHERE user_id = '" . $id . "'
										  AND question_id='" . $var['id'] . "'
										  ");
			while ( $row = mysqli_fetch_assoc($query) ) {
				echo "<td>
				".$row['value']."
				</td>";
			}
			
		}
	echo "</tr>";
}
echo "</table>";





//выводим переменные
echo "Вывод переменных<pre>";
foreach ($question_vars as $var ) {
 print_r ($var['id']);echo ": ";
 print_r ($var['var']);echo "<br>";
 }
echo "</pre>";


?>