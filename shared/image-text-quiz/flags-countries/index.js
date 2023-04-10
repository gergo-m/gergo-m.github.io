var countryNamesList = [];
var correctAnswers = [];
var wrongAnswers = [];

readFile("media/countries-list.txt", countryNamesList);

window.onload = function() {
    setTimeout(function() {
        setRandomFlag();
    }, 500);
};

document.querySelector("#submitCountryName").onclick = function() {
    if (this.innerHTML == "Check") {
        var submittedCountryName = document.querySelector("#inputCountryName").value;
        console.log("The user thinks this flag belongs to " + submittedCountryName);
        nextFlag(true);
    } else if (this.innerHTML == "Next") {
        nextFlag(false);
        this.innerHTML = "Check";
    }
};

document.querySelector("#countryFlag").onclick = function() {
    document.querySelector("#inputCountryName").value = this.alt;
    adjustLabelStyle("#questionLabel", false, 2000, wrongAnswers, correctAnswers);
    document.querySelector("#submitCountryName").innerHTML = "Next";
};

function nextFlag(changeColorOnNext) {
    if (document.querySelector("#inputCountryName").value.toUpperCase() == document.querySelector("#countryFlag").alt.toUpperCase()) {
        document.querySelector("#inputCountryName").value = "";
        if (changeColorOnNext) {
            adjustLabelStyle("#questionLabel", true, 2000, correctAnswers, wrongAnswers);
        }
        setRandomFlag();
    } else {
        if (changeColorOnNext) {
            adjustLabelStyle("#questionLabel", false, 2000, wrongAnswers, correctAnswers);
        }
    }
}

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

function adjustLabelStyle(querySelector, correct, waitTimeUntilReset, addToAnswerList, otherAnswerList) {
    if (typeof querySelector == "string" && typeof correct == "boolean" && typeof waitTimeUntilReset == "number") {
        if (!addToAnswerList.includes(document.querySelector("#countryFlag").alt) && !otherAnswerList.includes(document.querySelector("#countryFlag").alt)) {
            addToAnswerList.push(document.querySelector("#countryFlag").alt);
        }

        console.log(correctAnswers);
        console.log(wrongAnswers);

        document.querySelector(querySelector).style = "color: " + (correct ? "green" : "red");
        setTimeout(function() {
            document.querySelector(querySelector).style = "";
        }, waitTimeUntilReset);
    }
}

function setRandomFlag() {
    if (countryNamesList.length == 0) {
        document.querySelector("#countryFlag").src = "";
        document.querySelector("#countryFlag").alt = "Completed set with a score of " + correctAnswers.length + " out of " + (correctAnswers.length + wrongAnswers.length) + ". Reload the page to restart.";
    } else {
        var flagIndex = randomIntFromInterval(0, countryNamesList.length - 1);
        document.querySelector("#countryFlag").src = "media/flags/" + countryNamesList[flagIndex] + ".png";
        document.querySelector("#countryFlag").alt = countryNamesList[flagIndex];
        countryNamesList.splice(flagIndex, 1);
    }
}