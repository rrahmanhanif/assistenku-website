// ===============================
// CONFIG
// ===============================
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjhmNjVlM2NkZGQ2YzRhYTRhNDFlZjMxYzNjMjJiYzllIiwiaCI6Im11cm11cjY0In0=";
const WHATSAPP_NUMBER = "6285186660021";

// Terminal Coordinates Soetta
const TERMINALS = {
  t1: [-6.1256, 106.6559],
  t2: [-6.1198, 106.6555],
  t3: [-6.1270, 106.6537]
};

// ===============================
// MAP INIT
// ===============================
const map = L.map('map').setView([-6.2, 106.8], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

let pickupMarker = null;
let destinationMarker = null;
let routeLayer = null;

let destinationLocked = false;
let currentRouteData = null;

// ===============================
// CALCULATE FARE FUNCTION
// ===============================
function calculateFare(distanceMeters, surge = 1.0) {

  const RATE = 8000;
  const MIN_FARE = 70000;
  const AIRPORT_FEE = 25000;

  const km = Math.ceil(distanceMeters / 1000);

  const baseFare = Math.max(km * RATE, MIN_FARE);
  const subtotal = baseFare + AIRPORT_FEE;
  const finalPrice = Math.ceil((subtotal * surge) / 1000) * 1000;

  return {
    km,
    baseFare,
    airportFee: AIRPORT_FEE,
    surge,
    finalPrice
  };
}

// ===============================
// MAP CLICK FOR PICKUP
// ===============================
map.on("click", async function(e) {

  if (destinationLocked) return;

  if (!pickupMarker) {
    pickupMarker = L.marker(e.latlng).addTo(map)
      .bindPopup("Pickup").openPopup();
  } else {
    pickupMarker.setLatLng(e.latlng);
  }

  if (getMode() === "custom" && !destinationMarker) {
    alert("Silakan klik lagi untuk memilih tujuan.");
    return;
  }

  if (pickupMarker && destinationMarker) {
    await getRoute();
  }
});

// ===============================
// MODE SWITCH
// ===============================
function getMode() {
  return document.querySelector("input[name='mode']:checked").value;
}

document.querySelectorAll("input[name='mode']").forEach(el => {
  el.addEventListener("change", () => {
    resetAll();
    document.getElementById("terminalSelect").style.display =
      getMode() === "airport" ? "block" : "none";
  });
});

// ===============================
// TERMINAL SELECT
// ===============================
document.getElementById("terminal").addEventListener("change", () => {
  if (destinationLocked) return;

  const coords = TERMINALS[event.target.value];

  if (!destinationMarker) {
    destinationMarker = L.marker(coords).addTo(map)
      .bindPopup("Tujuan Terminal").openPopup();
  } else {
    destinationMarker.setLatLng(coords);
  }

  if (pickupMarker) getRoute();
});

// ===============================
// ROUTING VIA ORS
// ===============================
async function getRoute() {

  const start = pickupMarker.getLatLng();
  const end = destinationMarker.getLatLng();

  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat]
        ]
      })
    }
  );

  const data = await response.json();

  const distance = data.routes[0].summary.distance;

  const fare = calculateFare(distance);

  showResult(fare);

  drawRoute(data.routes[0].geometry);

  destinationLocked = true;
}

// ===============================
// DRAW ROUTE
// ===============================
function drawRoute(geometry) {

  if (routeLayer) map.removeLayer(routeLayer);

  const coords = L.Polyline.fromEncoded(geometry).getLatLngs();
  routeLayer = L.polyline(coords).addTo(map);
}

// ===============================
// SHOW RESULT
// ===============================
function showResult(fare) {

  currentRouteData = fare;

  document.getElementById("distance_km").innerText = fare.km;
  document.getElementById("base_fare").innerText = fare.baseFare.toLocaleString();
  document.getElementById("surge").innerText = fare.surge;
  document.getElementById("final_price").innerText = fare.finalPrice.toLocaleString();

  document.getElementById("calculation").classList.remove("hidden");
  document.getElementById("waBtn").classList.remove("hidden");
}

// ===============================
// WHATSAPP BUTTON
// ===============================
document.getElementById("waBtn").addEventListener("click", () => {

  if (!currentRouteData) return;

  const pickup = pickupMarker.getLatLng();
  const destination = destinationMarker.getLatLng();

  const message = `
Halo, saya ingin booking Order Bandara.

Pickup: https://maps.google.com/?q=${pickup.lat},${pickup.lng}
Tujuan: https://maps.google.com/?q=${destination.lat},${destination.lng}

Detail Perhitungan:
Jarak: ${currentRouteData.km} KM
Rate: Rp 8.000 / KM
Base Fare: Rp ${currentRouteData.baseFare.toLocaleString()}
Airport Fee: Rp 25.000
Surge: x${currentRouteData.surge}
Total: Rp ${currentRouteData.finalPrice.toLocaleString()}

Mohon konfirmasi ketersediaan driver.
`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

// ===============================
// RESET
// ===============================
function resetAll() {

  if (pickupMarker) map.removeLayer(pickupMarker);
  if (destinationMarker) map.removeLayer(destinationMarker);
  if (routeLayer) map.removeLayer(routeLayer);

  pickupMarker = null;
  destinationMarker = null;
  routeLayer = null;
  destinationLocked = false;

  document.getElementById("calculation").classList.add("hidden");
  document.getElementById("waBtn").classList.add("hidden");
      }
