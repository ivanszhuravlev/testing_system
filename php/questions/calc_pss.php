<?php

if(!array_key_exists(51, $answers)) {
    die("");
}

$result[0]['visit'] = $user['visit'];
$result[1]['visit'] = $user['visit'];
$result[2]['visit'] = $user['visit'];

$result[0]['value'] = $answers[51]['value'] + $answers[52]['value'] + $answers[53]['value'] + $answers[54]['value'] + $answers[55]['value'] + $answers[56]['value'] + $answers[57]['value'] + $answers[58]['value'] + $answers[59]['value'] + $answers[60]['value'];

$result[1]['value'] = $answers[51]['value'] + $answers[52]['value'] + $answers[53]['value'] + $answers[56]['value'] + $answers[59]['value'] + $answers[60]['value'];

$result[2]['value'] = $answers[54]['value'] + $answers[55]['value'] + $answers[57]['value'] + $answers[58]['value'];

$result[0]['var'] = "pss";
$result[1]['var'] = "phs";
$result[2]['var'] = "pses";
$result[2]['var'] = "pses";