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
			 while ( $row = mysqli_fetch_assoc($query2) ) 
			 {
				
				// ???
				if ($row['q'] / 10 < 1) {
					$q = '0' . $row['q'];
				} else {
					$q = $row['q'];
				}
				
					if ($row['v'] == 0) 
					{
						$question_vars_1[$row['s'] . $q . $row['name']] = [
						"var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
						"id"    => $row['id'],
						"visit" => '1'
					];
					}
					else 
					{
					$question_vars_1[$row['s'] . $q . $row['name']] = [
						"var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
						"id"    => $row['id'],
						"visit" => '1'
					];
					$question_vars_2[$row['s'] . $q . $row['name']] = [
						"var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
						"id"    => $row['id'],
						"visit" => '2'
					];
					$question_vars_3[$row['s'] . $q . $row['name']] = [
						"var"   => $row['name'] . '_s' . $row['s'] . 'q' . $row['q'] . $v,
						"id"    => $row['id'],
						"visit" => '3'
					];
					}

			}
			echo "<td>ID\Переменные</td>";
			foreach ($question_vars_1 as $var ) {
				echo "<td>";				
				print_r ($var['id']);
				echo ":";	
				print_r ($var['var']);
						echo ":";	
				print_r ($var['visit']);
				echo "</td>";
			}
			foreach ($question_vars_2 as $var ) {
				echo "<td>";				
				print_r ($var['id']);
				echo ":";	
				print_r ($var['var']);
						echo ":";	
				print_r ($var['visit']);
				echo "</td>";
			}
			foreach ($question_vars_3 as $var ) {
				echo "<td>";				
				print_r ($var['id']);
				echo ":";	
				print_r ($var['var']);
						echo ":";	
				print_r ($var['visit']);
				echo "</td>";
			}

echo "</tr>";
foreach ($uids as $id) {	
	//берем каждого пользователя
	echo "<tr><td>".$id."</td>";  
		//берем каждый ID вопроса
		foreach ($question_vars_1 as $var ) 
		{			
		//выбираем вопрос с таким ID из ответов пользователей для каждого пользователя по очереди
			$query = mysqli_query($link, "SELECT question_id, value, answer_id, text_value, visit
										  FROM user_answers 
										  WHERE user_id = '" . $id . "'
										  AND question_id='" . $var['id'] . "'
										  AND visit ='1'
										  ");
			while ( $row = mysqli_fetch_assoc($query) ) {
			
			 if ($row['text_value'])
				 {
					$value = $row['text_value'];
			} else {
						$value = $row['value'];
			}

			
			if ($row['answer_id']) {
						$qid = $row['answer_id'];
			} else {
						$qid = $row['question_id'];
				}
				echo "<td>1^
				".$value."
				</td>";
			}
			
		}
		foreach ($question_vars_2 as $var ) 
		{			
		//выбираем вопрос с таким ID из ответов пользователей для каждого пользователя по очереди
			$query = mysqli_query($link, "SELECT question_id, value, answer_id, text_value, visit
										  FROM user_answers 
										  WHERE user_id = '" . $id . "'
										  AND question_id='" . $var['id'] . "'
										  AND visit ='2'
										  ");
			while ( $row = mysqli_fetch_assoc($query) ) {
			
			 if ($row['text_value'])
				 {
					$value = $row['text_value'];
					} else {
						$value = $row['value'];
					}

					if ($row['answer_id']) {
						$qid = $row['answer_id'];
					} else {
						$qid = $row['question_id'];
				}
				echo "<td>2^
				".$value."
				</td>";
			}
			
		}
		foreach ($question_vars_3 as $var ) 
		{			
		//выбираем вопрос с таким ID из ответов пользователей для каждого пользователя по очереди
			$query = mysqli_query($link, "SELECT question_id, value, answer_id, text_value, visit
										  FROM user_answers 
										  WHERE user_id = '" . $id . "'
										  AND question_id='" . $var['id'] . "'
										  AND visit ='3'
										  ");
			while ( $row = mysqli_fetch_assoc($query) ) {
			
			 if ($row['text_value'])
				 {
					$value = $row['text_value'];
					} else {
						$value = $row['value'];
					}

					if ($row['answer_id']) {
						$qid = $row['answer_id'];
					} else {
						$qid = $row['question_id'];
				}
				echo "<td>^3
				".$value."
				</td>";
			}
			
		}
	echo "</tr>";
}
echo "</table>";







?>