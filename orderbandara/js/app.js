// ================================
// CONFIG
// ================================
const TERMINALS = {
  t1: [-6.1256, 106.6559],
  t2: [-6.1198, 106.6555],
  t3: [-6.1270, 106.6537]
};

// ================================
// STATE
// ================================
let pickupMarker = null;
let destinationMarker = null;
let pickupCoords = null;
let destinationCoords = null;

// ================================
// MAP INIT
// ================================
const map = L.map('map').setView([-6.2, 106.8], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// ================================
// MODE TOGGLE
// ================================
const modeRadios = document.querySelectorAll("input[name='mode']");
const airportSection = document.getElementById("airportSection");
const destinationSection = document.getElementById("destinationSection");

modeRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    toggleMode();
    resetAll();
  });
});

function getMode() {
  return document.querySelector("input[name='mode']:checked").value;
}

function toggleMode() {
  if (getMode() === "airport") {
    airportSection.classList.remove("hidden");
    destinationSection.classList.add("hidden");
  } else {
    airportSection.classList.add("hidden");
    destinationSection.classList.remove("hidden");
  }
}

// ================================
// TERMINAL AUTO DESTINATION
// ================================
document.getElementById("terminalSelect")
  .addEventListener("change", setTerminalDestination);

function setTerminalDestination() {

  const value = document.getElementById("terminalSelect").value;
  destinationCoords = TERMINALS[value];

  if (destinationMarker) {
    map.removeLayer(destinationMarker);
  }

  destinationMarker = L.marker(destinationCoords, { draggable: false })
    .addTo(map)
    .bindPopup("Tujuan Terminal")
    .openPopup();

  updateDestinationText(destinationCoords);
}

// ================================
// MAP CLICK HANDLER
// ================================
map.on("click", function(e) {

  const mode = getMode();

  if (!pickupCoords) {
    setPickup(e.latlng);
    return;
  }

  if (mode === "custom" && !destinationCoords) {
    setDestination(e.latlng);
  }
});

// ================================
// SET PICKUP
// ================================
function setPickup(latlng) {

  pickupCoords = [latlng.lat, latlng.lng];

  if (pickupMarker) map.removeLayer(pickupMarker);

  pickupMarker = L.marker(latlng, { draggable: true })
    .addTo(map)
    .bindPopup("Pickup")
    .openPopup();

  pickupMarker.on("dragend", function(e) {
    pickupCoords = [
      e.target.getLatLng().lat,
      e.target.getLatLng().lng
    ];
    updatePickupText(pickupCoords);
  });

  updatePickupText(pickupCoords);
}

// ================================
// SET DESTINATION (CUSTOM MODE)
// ================================
function setDestination(latlng) {

  destinationCoords = [latlng.lat, latlng.lng];

  if (destinationMarker) map.removeLayer(destinationMarker);

  destinationMarker = L.marker(latlng, { draggable: true })
    .addTo(map)
    .bindPopup("Tujuan")
    .openPopup();

  destinationMarker.on("dragend", function(e) {
    destinationCoords = [
      e.target.getLatLng().lat,
      e.target.getLatLng().lng
    ];
    updateDestinationText(destinationCoords);
  });

  updateDestinationText(destinationCoords);
}

// ================================
// UPDATE TEXT FIELD
// ================================
function updatePickupText(coords) {
  document.getElementById("pickupCoord").innerText =
    `${coords[0]}, ${coords[1]}`;
}

function updateDestinationText(coords) {
  document.getElementById("destinationCoord").innerText =
    `${coords[0]}, ${coords[1]}`;
}

// ================================
// RESET ALL WHEN MODE CHANGE
// ================================
function resetAll() {

  pickupCoords = null;
  destinationCoords = null;

  if (pickupMarker) map.removeLayer(pickupMarker);
  if (destinationMarker) map.removeLayer(destinationMarker);

  pickupMarker = null;
  destinationMarker = null;

  document.getElementById("pickupInput").value = "";
  document.getElementById("destinationInput").value = "";
  document.getElementById("pickupCoord").innerText = "";
  document.getElementById("destinationCoord").innerText = "";
}

// ================================
// INIT
// ================================
toggleMode();
setTerminalDestination();
