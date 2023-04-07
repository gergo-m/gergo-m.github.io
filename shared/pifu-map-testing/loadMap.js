export function loadMap(locationsList) {
    console.log(locationsList);

    class Location {
        constructor(latitude, longitude, name, text, pinType, pinColor, linkToArticle) {
            this.latitude = latitude;
            this.longitude = longitude;
            this.name = name;
            this.text = text;
            this.pinType = pinType;
            this.pinColor = pinColor;
            this.linkToArticle = linkToArticle;
        }
    }

    // map setup
    const map = L.map('pifuMap').setView([46.268544, 20.141423], 13);
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: attribution
    }).addTo(map);

    // icons
    var redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // loop through list to check for dupes --> add dupes to previous instance's text
    var locationsAdded = [];
    mainLoop:
    for (let i = 0; i < locationsList.length; i++) {
        const location = new Location(locationsList[i][0], locationsList[i][1], locationsList[i][2], locationsList[i][3], locationsList[i][4], locationsList[i][5], locationsList[i][6]);

        for (let j = 0; j < locationsAdded.length; j++) {
            if (location.name == locationsAdded[j].name) {
                /*if (locationsAdded[j].text.substr(0, locationsAdded[j].text.length - 4) == "</a>") {
                    locationsAdded[j].text = locationsAdded[j].text.substr(0, locationsAdded[j].text.length - 4) + "</a><br>• <a href='" + location.linkToArticle + "' target='_blank' style='text-color: black'>" + location.text + "</a>";
                } else {*/
                    locationsAdded[j].text += "<br>• <a href='" + location.linkToArticle + "' target='_blank' style='text-color: black'>" + location.text + "</a>";
                //}
                continue mainLoop;
            }
        }

        if (location.text != "") {
            location.text = "<br>• <a href='" + location.linkToArticle + "' target='_blank'>" + location.text + "</a>";
        }
        locationsAdded.push(location);
    }

    // loop through locations and create markers
    for (let i = 0; i < locationsAdded.length; i++) {
        var location = locationsAdded[i];
        var pin;

        switch (location.pinType) {
            case "MARKER":
                pin = L.marker([location.latitude, location.longitude], {icon: redIcon}).addTo(map);
                break;

            case "CIRCLE":
                pin = L.circle([location.latitude, location.longitude], {
                    color: location.pinColor,
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 5000
                }).addTo(map);
                break;
        
            default:
                pin = L.marker([location.latitude, location.longitude]).addTo(map);
                break;
        }

        if (location.text != "") {
            pin.bindPopup("<b>" + location.name + "</b>" + location.text).openPopup();
        } else {
            pin.bindPopup("<b>" + location.name + "</b>").openPopup();
        }
    }
}