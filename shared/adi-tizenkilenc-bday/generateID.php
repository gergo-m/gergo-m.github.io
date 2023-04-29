<?php
$letterSet = "abcdefghijklmnopqrstuvwxyz";
$numberSet = "0123456789";

$generatedPuzzleID = implode(" ", generate(8, $letterSet, $numberSet, 1));

function generate($length, $letters, $numbers, $amountToGenerate) {
    $passwords = array();
    for ($x = 0; $x < $amountToGenerate; $x++) {
        $password = "";
        for ($y = 0; $y < $length; $y++) {
            $random = rand(1, 3);
            if ($random == 1) {
                $password .= $letters[rand(0, strlen($letters)-1)];
            } else if ($random == 2) {
                $password .= strtoupper($letters[rand(0, strlen($letters)-1)]);
            } else {
                $password .= $numbers[rand(0, strlen($numbers)-1)];
            }
        }
        array_push($passwords, $password);
    }

    echo "[id: ".$passwords[0]."] ";
    return $passwords;
}
?>