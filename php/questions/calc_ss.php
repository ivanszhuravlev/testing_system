<?php

$result[0]['visit'] = $user['visit'];
$result[1]['visit'] = $user['svisittage'];

$result[0]['value'] = $answers[84]['value'] + $answers[85]['value'] + $answers[86]['value'] + $answers[87]['value'] + $answers[88]['value'] + $answers[89]['value'] + $answers[90]['value'] + $answers[91]['value'] + $answers[92]['value'] + $answers[93]['value'] + $answers[94]['value'] + $answers[95]['value'] + $answers[96]['value'] + $answers[97]['value'] + $answers[98]['value'] + $answers[99]['value'] + $answers[100]['value'] + $answers[101]['value'] + $answers[102]['value'];

$result[1]['value'] = 100 * ($result[0]['value'] - 19)/(95-19);

$result[0]['var'] = "ss";
$result[1]['var'] = "ss100";

