import { loadMap } from "./loadMap.js";

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
            if (data[i].length == 6) {
                console.log(data[i]);
                locationsList.push(data[i]);
            }
        }
        loadMap(locationsList);
    });
    reader.readAsText(xhr.response);
});
xhr.addEventListener("error", function() {
    console.error(`Error reading file ${filename}: ${this.error}`);
});
xhr.send();