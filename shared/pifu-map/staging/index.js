import { loadMap } from "./loadMap.js";

// Adjust map height according to screen height
window.addEventListener('resize', function() {
    var height = window.innerHeight;
    document.getElementById("pifuMap").style.height = height-65 + "px";
});

// Read from locations file
var locationsList = [];

const filename = "locations.txt";
const xhr = new XMLHttpRequest();
xhr.open("GET", filename);
xhr.responseType = "blob";
xhr.addEventListener("load", function() {
    const reader = new FileReader();
    reader.addEventListener("load", function() {
        const contents = this.result;
        const data = contents.trim().split("\n").map(line => line.trim().split(" [$] "));
        for (let i = 0; i < data.length; i++) {
            if (data[i].length > 1) {
                if (data[i].length == 6) {
                    data[i].push("https://szepi.hu/iskola/ujsag/");
                } else if (data[i][6] == " ") {
                    data[i][6] = "https://szepi.hu/iskola/ujsag/";
                }

                locationsList.push(data[i]);
            }
        }
        loadMap(locationsList);
    });
    reader.readAsText(xhr.response);
    document.getElementById("pifuMap").style.height = window.innerHeight-65 + "px";
});
xhr.addEventListener("error", function() {
    console.error(`Error reading file ${filename}: ${this.error}`);
});
xhr.send();