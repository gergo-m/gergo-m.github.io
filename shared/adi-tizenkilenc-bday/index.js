var imageParts = [];
var image = new Image();
image.src = "images/photo_adi-19-bday.jpg";

var numRowsToCut = 4;
var numColsToCut = 3;
var widthOfOnePiece = 960 / numColsToCut;
var heightOfOnePiece = 1280 / numRowsToCut;

function cutImageUp() {
    for (var x = 0; x < numRowsToCut; x++) {
        for (var y = 0; y < numColsToCut; y++) {
            var canvas = document.createElement('canvas');
            canvas.width = widthOfOnePiece;
            canvas.height = heightOfOnePiece;
            var context = canvas.getContext('2d');
            context.drawImage(image, y * widthOfOnePiece, x * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
            imageParts.push(canvas.toDataURL());
        }
    }
}

image.onload = function() {
    cutImageUp();
    constructGrid();
    fillGrid();
}

function constructGrid() {
    var container = buildElement("div", "container", "container", document.body);
    var rowOne = buildElement("div", "row", "", container);
    var rowTwo = buildElement("div", "row", "", container);
    var colOne = buildElement("div", "col d-flex justify-content-center", "", rowOne);
    var colTwo = buildElement("div", "col d-flex justify-content-center", "", rowTwo);
    var title = document.getElementById("title");
    colOne.appendChild(title);
    var table = document.getElementById("mainTable");
    colTwo.appendChild(table); // rowTwo
    //document.getElementById("tableHeader").setAttribute("colspan", numColsToCut);
    for (var i = 0; i < numRowsToCut; i++) {
        var tableRow = buildElement("tr", "table-row", "tableRow" + i, table);
        for (var j = 0; j < numColsToCut; j++) {
            var tableSlot = buildElement("td", "table-slot", "tableSlot" + (i * numColsToCut + j), tableRow);
        }
    }
}

function fillGrid() {
    putArrowsInGrids();
    var puzzlePieces = imageParts.concat();
    for (var i = 0; i < imageParts.length; i++) {
        currentGrid = document.getElementById("tableSlot" + i);
        if (currentGrid) {
            var randomPieceIndex = Math.floor(Math.random() * puzzlePieces.length);
            if (randomPieceIndex < puzzlePieces.length) {
                var currentPuzzlePiece = puzzlePieces[randomPieceIndex];
                puzzlePieces.splice(randomPieceIndex, 1);
                var imageElement = buildElement("img", "grid-image", "gridImage" + randomPieceIndex, currentGrid);
                if (image.width > image.height) {
                    imageElement.style.width = "15vw";
                    imageElement.style.height = "auto";
                } else {
                    imageElement.style.width = "auto";
                    imageElement.style.height = "30vh";
                }
                Array.from(currentGrid.children).at(-1).src = currentPuzzlePiece;
            }
        }
    }
}

function putArrowsInGrids() {
    for (var i = 0; i < numRowsToCut; i++) {
        var currentRow = document.getElementsByClassName("table-row")[i];
        for (var j = 0; j < numColsToCut; j++) {
            if (i == 0) { // top row
                switch (j) {
                    case 0: // left column
                        buildArrows(["down", "right"], currentRow.children[j]);
                        break;
                    case numColsToCut-1: // right column
                        buildArrows(["down", "left"], currentRow.children[j]);
                        break;
                    default:
                        buildArrows(["down", "left", "right"], currentRow.children[j]);
                        break;
                }
            } else if (i == numRowsToCut-1) { // bottom row
                switch (j) {
                    case 0: // left column
                        buildArrows(["up", "right"], currentRow.children[j]);
                        break;
                    case numColsToCut-1: // right column
                        buildArrows(["up", "left"], currentRow.children[j]);
                        break;
                    default:
                        buildArrows(["up", "left", "right"], currentRow.children[j]);
                        break;
                }
            } else {
                switch (j) {
                    case 0: // left column
                        buildArrows(["up", "down", "right"], currentRow.children[j]);
                        break;
                    case numColsToCut-1: // right column
                        buildArrows(["up", "down", "left"], currentRow.children[j]);
                        break;
                    default:
                        buildArrows(["up", "down", "left", "right"], currentRow.children[j]);
                        break;
                }
            }
        }
    }

    configureArrows();
}

function configureArrows() {
    const directions = ["up", "down", "left", "right"];
    const directionSteps = ["-" + numColsToCut, "+" + numColsToCut, "-1", "+1"];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < imageParts.length; j++) {
            if (document.getElementsByClassName("triangle-" + directions[i])[j]) {
                document.getElementsByClassName("triangle-" + directions[i])[j].onclick = function() {
                    var currentSlot = this.parentElement;
                    var targetSlot = document.getElementById("tableSlot" + (Number(String(currentSlot.id).replace("tableSlot", ""))+Number(directionSteps[i])));
                    var currentImage = Array.from(currentSlot.children).at(-1);
                    var targetImage = Array.from(targetSlot.children).at(-1);
                    targetSlot.appendChild(currentImage);
                    currentSlot.appendChild(targetImage);

                    checkCompletion();
                };
            }
        }
    }
}

function buildArrows(directions, parent) {
    directions = Array.from(directions);
    if (directions.includes("up")) {
        buildElement("div", "triangle-up", "", parent);
    }
    if (directions.includes("down")) {
        buildElement("div", "triangle-down", "", parent);
    }
    if (directions.includes("left")) {
        buildElement("div", "triangle-left", "", parent);
    }
    if (directions.includes("right")) {
        buildElement("div", "triangle-right", "", parent);
    }
}

function checkCompletion() {
    const directions = ["up", "down", "left", "right"];

    correct = 0;
    for (var i = 0; i < imageParts.length; i++) {
        if (Array.from(document.getElementById("tableSlot" + i).children).at(-1).src == imageParts[i]) {
            correct += 1;
        }
    }

    if (correct == imageParts.length) {
        for (let a = 0; a < 4; a++) {
            var arrows = document.getElementsByClassName("triangle-" + directions[a]);
            for (let b = 0; b < arrows.length; b++) {
                arrows[b].style.opacity = 0 + "%";
                arrows[b].onclick = {};
            }
        }
        document.getElementById("title").innerHTML = "Boldog Szülinapot! 🥳"; // TO-DO change to user input
    }
}

function buildElement(type, className, idName, parent) {
    var element = document.createElement(type);
    if (className != "" && className != null) {
        element.className = className;
    }
    if (idName != "" && idName != null) {
        element.id = idName;
    }
    parent.appendChild(element);
    return element;
}