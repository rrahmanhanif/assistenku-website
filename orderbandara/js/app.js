// ================== CONFIG ==================

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjhmNjVlM2NkZGQ2YzRhYTRhNDFlZjMxYzNjMjJiYzllIiwiaCI6Im11cm11cjY0In0=";

const tarifPerKm = 8000;
const airportFee = 25000;
const minimumFare = 41000;
const surgeMultiplier = 1;

const terminalCoords = {
  T1: [-6.1256, 106.6559],
  T2: [-6.1272, 106.6537],
  T3: [-6.1246, 106.6577]
};

// ================== STATE ==================

let mode = "airport";
let subMode = "drop";
let startCoords = null;
let endCoords = null;
let finalLocked = false;

// ================== MAP INIT ==================

const map = L.map('map').setView([-6.2, 106.8], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: ''
}).addTo(map);

let startMarker = null;
let endMarker = null;

// ================== MODE FUNCTIONS ==================

function setMode(newMode) {
  mode = newMode;
  document.getElementById("airportSubMode").style.display = mode === "airport" ? "block" : "none";
  document.getElementById("terminalSection").style.display = mode === "airport" ? "block" : "none";
  document.getElementById("destinationSection").style.display = mode === "custom" ? "block" : "none";
  resetCalculation();
}

function setSubMode(newSub) {
  subMode = newSub;
  resetCalculation();
}

// ================== MARKER ==================

function updateMarker(type, latlng) {

  if (type === "start") {
    if (startMarker) map.removeLayer(startMarker);
    startMarker = L.marker(latlng, { draggable: true }).addTo(map);
    startMarker.on("dragend", () => {
      startCoords = startMarker.getLatLng();
      calculateRoute();
    });
    startCoords = latlng;
  }

  if (type === "end") {
    if (endMarker) map.removeLayer(endMarker);
    endMarker = L.marker(latlng, { draggable: true }).addTo(map);
    endMarker.on("dragend", () => {
      endCoords = endMarker.getLatLng();
      calculateRoute();
    });
    endCoords = latlng;
  }

  calculateRoute();
}

// ================== ROUTING ==================

async function calculateRoute() {

  if (!startCoords || !endCoords || finalLocked) {
    document.getElementById("waButton").disabled = true;
    return;
  }

  const body = {
    coordinates: [
      [startCoords.lng, startCoords.lat],
      [endCoords.lng, endCoords.lat]
    ]
  };

  const res = await fetch("https://api.openrouteservice.org/v2/directions/driving-car", {
    method: "POST",
    headers: {
      "Authorization": ORS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  const distance = data.routes[0].summary.distance;
  const km = distance / 1000;

  calculateFare(km);
}

// ================== FARE ==================

function calculateFare(km) {

  let total = 0;

  if (km <= 3) {
    total = minimumFare;
  } else {
    let baseFare = km * tarifPerKm;
    let finalBase = baseFare * surgeMultiplier;
    total = mode === "airport" ? finalBase + airportFee : finalBase;
  }

  if (total < minimumFare) total = minimumFare;

  total = Math.ceil(total / 1000) * 1000;

  updateUI(km, total);
}

// ================== UI ==================

function updateUI(km, total) {

  document.getElementById("distance").innerText = km.toFixed(2) + " KM";
  document.getElementById("baseFare").innerText = (km * tarifPerKm).toLocaleString();
  document.getElementById("airportFee").innerText = mode === "airport" ? airportFee.toLocaleString() : "0";
  document.getElementById("total").innerText = total.toLocaleString();

  document.getElementById("waButton").disabled = false;
}

// ================== RESET ==================

function resetCalculation() {

  startCoords = null;
  endCoords = null;
  finalLocked = false;

  if (startMarker) map.removeLayer(startMarker);
  if (endMarker) map.removeLayer(endMarker);

  document.getElementById("distance").innerText = "-";
  document.getElementById("baseFare").innerText = "-";
  document.getElementById("airportFee").innerText = "-";
  document.getElementById("total").innerText = "-";

  document.getElementById("waButton").disabled = true;
}

// ================== TERMINAL ==================

document.getElementById("terminalSelect").addEventListener("change", function() {
  const term = this.value;
  if (!term) return;

  const coords = L.latLng(terminalCoords[term][0], terminalCoords[term][1]);

  if (subMode === "drop") {
    updateMarker("end", coords);
  } else {
    updateMarker("start", coords);
  }
});

// ================== MAP CLICK ==================

map.on("click", function(e) {

  if (mode === "custom") {

    if (!startCoords) updateMarker("start", e.latlng);
    else updateMarker("end", e.latlng);

  } else {

    if (subMode === "drop") updateMarker("start", e.latlng);
    else updateMarker("end", e.latlng);
  }
});

// ================== MODE LISTENER ==================

document.querySelectorAll("input[name='mode']").forEach(el => {
  el.addEventListener("change", e => setMode(e.target.value));
});

document.querySelectorAll("input[name='airportType']").forEach(el => {
  el.addEventListener("change", e => setSubMode(e.target.value));
});

// ================== FREEZE ==================

document.getElementById("waButton").addEventListener("click", function() {
  finalLocked = true;
  alert("Harga dikunci. Perubahan lokasi akan membatalkan harga.");
});
