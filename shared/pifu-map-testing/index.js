// Locations
const dapgSzeged = {
    latitude: 46.268544,
    longitude: 20.141423,
    name: "Szegedi Piarista Gimnázium",
    text: "",
    pinType: "MARKER",
    pinColor: "RED"
}
const croatiaUvalaScott = {
    latitude: 45.254220,
    longitude: 14.576580,
    name: "Kraljevica, Horvátország",
    text: "<br>2023a 12-es osztálykirándulás",
    pinType: "CIRCLE",
    pinColor: "RED"
}

const map = L.map('pifuMap').setView([51.505, -0.09], 13);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: attribution
}).addTo(map);

var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var dapgMarker = L.marker([46.268544, 20.141423], {icon: redIcon}).addTo(map);
dapgMarker.bindPopup("<b>" + dapgSzeged.name + "</b>" + dapgSzeged.text).openPopup();

var croatiaUvalaScottCircle = L.circle([croatiaUvalaScott.latitude, croatiaUvalaScott.longitude], {
    color: croatiaUvalaScott.pinColor,
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 5000
}).addTo(map);
croatiaUvalaScottCircle.bindPopup("<b>a" + croatiaUvalaScott.name + "</b>" + croatiaUvalaScott.text);