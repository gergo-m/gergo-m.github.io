function passValues() {
    var imageFile = document.getElementById("image-preview").innerHTML;
    var rowCount = document.getElementById("row-count").value;
    var colCount = document.getElementById("col-count").value;

    localStorage.setItem("imageData", imageToSend);
    localStorage.setItem("rowCount", rowCount);
    localStorage.setItem("colCount", colCount);

    return false;
}

console.log("hello js");

const imageFileInput = document.getElementById("image-file");
const imagePreview = document.getElementById("image-preview");
var imageToSend = "";

imageFileInput.addEventListener("change", function() {
    getImageData();
});

function getImageData() {
    const file = imageFileInput.files[0];
    if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function() {
            imagePreview.style.display = "block";
            imagePreview.innerHTML = "";
            /*var imagePreviewMedia = buildElement("img", "", "image-preview-media", imagePreview);
            imagePreviewMedia.onload = function() {
                imageToSend = this.src;
                document.getElementById("image-data").value = this.src;
                document.getElementById("image-width").value = this.naturalWidth;
                document.getElementById("image-height").value = this.naturalHeight;
            }*/

            paintImagePreview(this.result);

            return this.result;
        });
    }
}

function paintImagePreview(imageSrc) {
    var img = new Image();
    img.src = imageSrc;

    rows = document.getElementById("row-count").value;
    cols = document.getElementById("col-count").value;
    imgWidth = img.width;
    imgHeight = img.height;
    console.log("image width: " + img.width);
    console.log("image height: " + img.height);

    var canvas = document.getElementById('canvas');
    var canvasEdited =  document.getElementById('canvasEdited');
    var ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    canvasEdited.width = img.width;
    canvasEdited.height = img.height;
    img.onload = function() {
        console.log("0");

        ctx.drawImage(img, 0, 0);

        console.log("1");

        var imageData = ctx.getImageData(0,0, canvas.width, canvas.height);

        console.log("2");

        editPixels(imageData.data);

        console.log("3");

        drawEditedImage(imageData);

        console.log("4");

        document.getElementById("image-preview").src = canvasEdited.toDataURL("image/png");

        console.log("5");

        document.getElementById("image-data").value = canvas.toDataURL("image/png");
        document.getElementById("image-width").value = imagePreview.naturalWidth;
        document.getElementById("image-height").value = imagePreview.naturalHeight;

        console.log("6");
    };    
}

function editPixels(imgData) {
    for (var i = 0; i < imgData.length; i += 4) {
        for (var j = 1; j < rows + 1; j++) {
            if (i > imgWidth * 4 * (imgHeight / rows * j) && i < imgWidth * 4 * (imgHeight / rows * j) + imgWidth * 4 * 5) {
                imgData[i] = 0;
                imgData[i+1] = 0;
                imgData[i+2] = 0;
            }
        }
        for (var k = 1; k < cols + 1; k++) {
            if (i % (imgWidth / cols * 4) == 0 && i % (imgWidth * 4) != 0) {
                imgData[i] = 0;
                imgData[i+1] = 0;
                imgData[i+2] = 0;
                imgData[i+4] = 0;
                imgData[i+5] = 0;
                imgData[i+6] = 0;
                imgData[i+8] = 0;
                imgData[i+9] = 0;
                imgData[i+10] = 0;
                imgData[i+12] = 0;
                imgData[i+13] = 0;
                imgData[i+14] = 0;
                imgData[i+16] = 0;
                imgData[i+17] = 0;
                imgData[i+18] = 0;
            }
        }
    }
}

function drawEditedImage(newData) {
    var ctxEdited = canvasEdited.getContext('2d');
    ctxEdited.putImageData(newData, 0, 0);
}

document.getElementById("row-count").addEventListener("change", function() {
    /*var previewDiv = document.getElementById("preview-div");
    var colCount = document.getElementById("col-count");
    previewDiv.innerHTML = "";
    for (var i = 0; i < this.value; i++) { // column
        var previewCol = buildElement("div", "row", "", document.getElementById("preview-div"));
        for (var j = 0; j < colCount.value; j++) { // row
            var previewSlot = buildElement("div", "col preview-slot", "", previewCol);
            previewSlot.style.borderTop = "2px solid #000000";
            previewSlot.style.borderLeft = "2px solid #000000";
            previewSlot.style.width = document.getElementById("image-preview").clientWidth / colCount.value + "px";
            previewSlot.style.height = document.getElementById("image-preview").clientHeight / this.value + "px";
            previewSlot.style.padding = "0px";
            if (j == colCount.value - 1) {
                previewSlot.style.borderRight = "2px solid #000000";
            }
            if (i == this.value - 1) {
                previewSlot.style.borderBottom = "2px solid #000000";
            }
        }
    }*/
    getImageData();
});

document.getElementById("col-count").addEventListener("change", function() {
    /*var previewDiv = document.getElementById("preview-div");
    var rowCount = document.getElementById("row-count");
    previewDiv.innerHTML = "";
    for (var i = 0; i < rowCount.value; i++) { // column
        var previewCol = buildElement("div", "row", "", document.getElementById("preview-div"));
        for (var j = 0; j < this.value; j++) { // row
            var previewSlot = buildElement("div", "col preview-slot", "", previewCol);
            previewSlot.style.borderTop = "2px solid #000000";
            previewSlot.style.borderLeft = "2px solid #000000";
            previewSlot.style.width = document.getElementById("image-preview").clientWidth / this.value + "px";
            previewSlot.style.height = document.getElementById("image-preview").clientHeight / rowCount.value + "px";
            previewSlot.style.padding = "0px";
            if (j == this.value - 1) {
                previewSlot.style.borderRight = "2px solid #000000";
            }
            if (i == rowCount.value - 1) {
                previewSlot.style.borderBottom = "2px solid #000000";
            }
        }
    }*/
    getImageData();
});

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