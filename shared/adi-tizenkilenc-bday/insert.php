<?php
include "generateID.php";
$puzzleID = $generatedPuzzleID;
$imageData = $_POST["imageData"];
$rowCount = $_POST["rowCount"];
$columnCount = $_POST["columnCount"];
$imageWidth = $_POST["imageWidth"];
$imageHeight = $_POST["imageHeight"];

if (!empty($puzzleID) || !empty($imageData) || !empty($rowCount) || !empty($columnCount) || !empty($imageWidth) || !empty($imageHeight)) {
    $host = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbname = "puzzleme"; // change connection details

    // create connection
    $connection = new mysqli($host, $dbUsername, $dbPassword, $dbname);

    if (mysqli_connect_error()) {
        die("Connection error(". mysqli_connect_errno().")". mysqli_connect_error());
    } else {
        $SELECT = "SELECT puzzleID FROM registered_puzzles WHERE puzzleID = ? Limit 1";
        $INSERT = "INSERT Into registered_puzzles (puzzleID, imageData, rowCount, columnCount, imageWidth, imageHeight) values(?, ?, ?, ?, ?, ?)";

        // prepare statement
        $statement = $connection->prepare($SELECT);
        $statement->bind_param("s", $puzzleID);
        $statement->execute();
        $statement->bind_result($puzzleID);
        $statement->store_result();
        $rnum = $statement->num_rows;

        if ($rnum == 0) {
            $statement->close();

            $statement = $connection->prepare($INSERT);
            $statement->bind_param("ssiiii", $puzzleID, $imageData, $rowCount, $columnCount, $imageWidth, $imageHeight);
            $statement->execute();
            echo "<br><br>New record has been inserted successfully.<br><br>Share: http://127.0.0.1/puzzle/puzzle.php?id=" . $puzzleID; // change link
        } else {
            echo "Someone already registered a puzzle with this ID.";
        }
        $statement->close();
        $connection->close();
    }
} else {
    echo "All fields are required!";
    die();
}
?>