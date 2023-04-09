var countryNamesList = [];

readFile("media/countries-list.txt", countryNamesList);

window.onload = function() {
    setTimeout(function() {
        setRandomFlag();
    }, 500);
};

document.querySelector("#submitCountryName").onclick = function() {
    var submittedCountryName = document.querySelector("#inputCountryName").value;
    console.log("The user thinks this flag belongs to " + submittedCountryName);
    if (document.querySelector("#inputCountryName").value.toUpperCase() == document.querySelector("#countryFlag").alt.toUpperCase()) {
        console.log("correct");

        setRandomFlag();
        document.querySelector("#inputCountryName").value = "";
        adjustLabelStyle("#questionLabel", true, 2000);
    } else {
        console.log("incorrect");
        
        adjustLabelStyle("#questionLabel", false, 2000);
    }
};

document.querySelector("#countryFlag").onclick = function() {
    document.querySelector("#inputCountryName").value = this.alt;
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function readFile(fileName, list) {
    const filename = fileName;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", filename);
    xhr.responseType = "blob";
    xhr.addEventListener("load", function() {
        const reader = new FileReader();
        reader.addEventListener("load", function() {
            const contents = this.result;
            const data = contents.trim().split("\n");
            for (let i = 0; i < data.length; i++) {
                list.push(data[i].replace("\r", ""));
            }
        });
        reader.readAsText(xhr.response);
    });
    xhr.addEventListener("error", function() {
        console.error(`Error reading file ${filename}: ${this.error}`);
    });
    xhr.send();
}

function adjustLabelStyle(querySelector, correct, waitTimeUntilReset) {
    if (typeof querySelector == "string" && typeof correct == "boolean" && typeof waitTimeUntilReset == "number") {
        document.querySelector(querySelector).style = "color: " + (correct ? "green" : "red");
        setTimeout(function() {
            document.querySelector(querySelector).style = "";
        }, waitTimeUntilReset);
    }
}

function setRandomFlag() {
    var flagIndex = randomIntFromInterval(0, 196);
    document.querySelector("#countryFlag").src = "media/flags/" + countryNamesList[flagIndex] + ".png";
    document.querySelector("#countryFlag").alt = countryNamesList[flagIndex];
}