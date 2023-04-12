var countryNamesList = [];
var correctAnswersInSession = [];
var wrongAnswers = [];
var answersInSession = [];

readFile("media/countries-list.txt", countryNamesList);

window.onload = function() {
    setTimeout(function() {
        setRandomFlag();
    }, 500);
};

document.querySelector("#submitCountryName").onclick = function() {
    if (this.innerHTML == "Check") {
        if (document.querySelector("#countryFlag").alt.includes("round")) {
            console.log("includes");
            this.innerHTML = "Continue";
        } else {
            var submittedCountryName = document.querySelector("#inputCountryName").value;
            console.log("The user thinks this flag belongs to " + submittedCountryName);
            nextFlag(true);
        }
    } else if (this.innerHTML == "Next") {
        nextFlag(false);
        this.innerHTML = "Check";
    } else if (this.innerHTML == "Continue") {
        setRandomFlag();
        this.innerHTML = "Check";
    }
};

document.querySelector("#countryFlag").onclick = function() {
    document.querySelector("#inputCountryName").value = this.alt;
    adjustLabelStyle("#questionLabel", false, 1000, wrongAnswers, correctAnswersInSession);
    document.querySelector("#submitCountryName").innerHTML = "Next";
};

function nextFlag(changeColorOnNext) {
    if (document.querySelector("#inputCountryName").value.toUpperCase() == document.querySelector("#countryFlag").alt.toUpperCase()) {
        document.querySelector("#inputCountryName").value = "";
        if (changeColorOnNext) {
            adjustLabelStyle("#questionLabel", true, 1000, correctAnswersInSession, wrongAnswers);
        }
        setRandomFlag();
    } else {
        if (changeColorOnNext) {
            adjustLabelStyle("#questionLabel", false, 1000, wrongAnswers, correctAnswersInSession);
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

        if (!correctAnswersInSession.includes(document.querySelector("#countryFlag").alt)
            && !wrongAnswers.includes(document.querySelector("#countryFlag").alt)
            && !answersInSession.includes(document.querySelector("#countryFlag").alt)
            && countryNamesList.includes(document.querySelector("#countryFlag").alt)) {
                console.log("here1");
                if (correct) {
                    correctAnswersInSession.push(document.querySelector("#countryFlag").alt);
                    console.log("here2");
                } else {
                    wrongAnswers.push(document.querySelector("#countryFlag").alt);
                    console.log("here3");
                }
                const index = countryNamesList.indexOf(document.querySelector("#countryFlag").alt);
                if (index > -1) {
                    countryNamesList.splice(index, 1);
                }
        
                answersInSession.push(document.querySelector("#countryFlag").alt);
        }

        console.log("countryNamesList " + countryNamesList);
        console.log(correctAnswersInSession);
        console.log(wrongAnswers);
        console.log("answersInSession " + answersInSession);

        document.querySelector(querySelector).style = "color: " + (correct ? "green" : "red");
        setTimeout(function() {
            document.querySelector(querySelector).style = "";
        }, waitTimeUntilReset);
    }
}

function setRandomFlag() {
    if (wrongAnswers.length == 0 && countryNamesList.length == 0) { // FINISHED SESSION
        document.querySelector("#countryFlag").src = "";
        document.querySelector("#countryFlag").alt = "Completed session. Reload the page to restart.";

    } else if (correctAnswersInSession.length + wrongAnswers.length == countryNamesList.length + answersInSession.length) { // FINISHED ROUND
        console.log("finished round");
        document.querySelector("#submitCountryName").innerHTML = "Continue";
        document.querySelector("#countryFlag").src = "";
        document.querySelector("#countryFlag").alt = "Completed round with a score of " + correctAnswersInSession.length + " out of " + answersInSession.length + ". Press \"Continue\" to start the next round.";

        console.log("COMPLETE ROUND");

        correctAnswersInSession = [];
        countryNamesList = [];
        answersInSession = [];
        wrongAnswers.forEach(element => {
            countryNamesList.push(element);
        });
        wrongAnswers = [];

    } else {
        var flagIndex = randomIntFromInterval(0, countryNamesList.length - 1);
        document.querySelector("#countryFlag").src = "media/flags/" + countryNamesList[flagIndex] + ".png";
        document.querySelector("#countryFlag").alt = countryNamesList[flagIndex];
        //countryNamesList.splice(flagIndex, 1);
    }
}