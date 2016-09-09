<?php

$result[0]['visit'] = $user['stage'];

$query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = 'hivknow' AND user_id = " . $user['id'] . " AND visit = " . $user['stage']);
$row = mysqli_fetch_assoc($query);

$result[0]['value'] = is_null($row) ? 0 : $row['value'];

switch($page_id) {
    case 1:
        if ($answers == 1) {
            $result[0]['value'] += 1;
        }
        break;
    case 3:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 5:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 7:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 9:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 11:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 13:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 15:
        if ($answers == 1) {
            $result[0]['value'] += 1;
        }
        break;
    case 17:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 19:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 21:
        if ($answers == 1) {
            $result[0]['value'] += 1;
        }
        break;
    case 23:
        $arr = array(409);
        if ($answers == $arr) {
            $result[0]['value'] += 1;
        }
        break;
    case 25:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 27:
        if ($answers == 0) {
            $result[0]['value'] += 1;
        }
        break;
    case 29:
        if ($answers <= 3) {
            $result[0]['value'] += 1;
        }
        break;
    case 31:
        $arr = array(412, 414);
        if ($answers == $arr) {
            $result[0]['value'] += 1;
        }
        break;
    case 33:
        $arr = array(415, 416, 417, 418, 419, 420, 421, 423);
        if ($answers == $arr) {
            $result[0]['value'] = 1;
        } else {
            $result[0]['value'] = 0;
        }
        break;
    default:
        break;
}

$result[0]['var'] = $page_id == 33 ? "condom" : "hivknow";

$query = mysqli_query($link, "SELECT value FROM user_answers WHERE variable = '" . $result[0]['var'] . "' AND user_id = " . $user['id'] . " AND visit = " . $user['stage']);
$row = mysqli_fetch_assoc($query);

if (is_null($row)) {
    $query = mysqli_query($link, "INSERT INTO user_answers SET " .
                      "user_id = '" . $user["id"] . "'," .
                      "value = '" . $result[0]['value'] . "'," .
                      "visit = '" . $result[0]['visit'] . "'," .
                      "variable = '" . $result[0]['var'] . "'"
                     );
} else {
    $query = mysqli_query($link, "UPDATE user_answers SET value = '" . $result[0]['value'] . "' WHERE variable = '" . $result[0]['var'] . "' AND user_id = " . $user['id'] . " AND visit = " . $user['stage']);
}