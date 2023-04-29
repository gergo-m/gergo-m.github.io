<?php
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puzzle Me</title>
    <link rel="stylesheet" href="puzzle.css">
</head>
<body>
    Data: <span id="data">';

$id = $_GET["id"];

$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "puzzleme"; // change connection details

// create connection
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT puzzleID, imageData, rowCount, columnCount, imageWidth, imageHeight FROM registered_puzzles WHERE puzzleID = '$id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "Puzzle ID: " . $row["puzzleID"] . " - Row count: " . $row["rowCount"] . " - Column count: " . $row["columnCount"] . " - Image width: " . $row["imageWidth"] . " - Image height: " . $row["imageHeight"] . "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();

echo '</span>
    <div id="container">
        <table id="mainTable">
            <tr>
                <th colspan="0" id="tableHeader"><p id="title">solve this puzzle or else</p></th> <!-- TO-DO change to user input -->
            </tr>
        </table>
    </div>
    <script type="text/javascript">';

$id = $_GET["id"];

$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "puzzleme"; // change connection details

// create connection
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT puzzleID, imageData, rowCount, columnCount, imageWidth, imageHeight FROM registered_puzzles WHERE puzzleID = '$id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        echo 'imageData="' . $row["imageData"] . '";';
        echo "rowCount=" . $row["rowCount"] . ";";
        echo "columnCount=" . $row["columnCount"] . ";";
        echo "imageWidth=" . $row["imageWidth"] . ";";
        echo "imageHeight=" . $row["imageHeight"] . ";";
    }
} else {
    echo "0 results";
}
$conn->close();

echo '</script>
    <script src="puzzle.js"></script>
</body>
</html>';
?>