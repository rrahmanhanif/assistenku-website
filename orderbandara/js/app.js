let lockedDestination = "Soekarno-Hatta";
let calculationData = null;

document.getElementById("calculateBtn").addEventListener("click", async () => {

  const pickup = document.getElementById("pickup").value;
  const distance = parseFloat(document.getElementById("distance").value);
  const surge = parseFloat(document.getElementById("surge").value);

  if (!pickup || !distance) {
    alert("Lengkapi data.");
    return;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ distance_km: distance, surge })
  });

  const data = await response.json();

  calculationData = {
    pickup,
    ...data
  };

  document.getElementById("res_distance").innerText = data.distance_km;
  document.getElementById("res_base").innerText = data.base_fare.toLocaleString();
  document.getElementById("res_surge").innerText = data.surge;
  document.getElementById("res_total").innerText = data.final_price.toLocaleString();

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("waBtn").classList.remove("hidden");
});

document.getElementById("waBtn").addEventListener("click", () => {

  if (!calculationData) return;

  const msg =
`Halo, saya ingin booking Order Bandara.

Pickup: ${calculationData.pickup}
Tujuan: Soekarno-Hatta (Fix)

Detail Perhitungan:
Jarak: ${calculationData.distance_km} KM
Rate: Rp 8.000 / KM
Base Fare: Rp ${calculationData.base_fare.toLocaleString()}
Airport Fee: Rp 25.000
Surge: x${calculationData.surge}

Total: Rp ${calculationData.final_price.toLocaleString()}

Saya memahami bahwa tujuan tidak dapat diubah setelah harga dikonfirmasi.
Mohon konfirmasi ketersediaan driver.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});
