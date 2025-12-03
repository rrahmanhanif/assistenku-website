  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  overlay.innerHTML = `
    <div style="
      width: 92%;
      max-width: 380px;
      padding: 25px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.20);
      text-align:center;
    ">
      <h3 style="margin-bottom: 10px; color:#0d6efd;">Masukkan Password</h3>
      <p style="font-size:14px; color:#333;">Halaman ini memerlukan akses khusus.</p>

      <input type="password" id="inputPass" placeholder="Password"
        style="width:100%; padding:12px; margin-top:15px; border-radius:10px; border:1px solid #ccc;">

      <div style="margin-top:20px; display:flex; justify-content:flex-end; gap:12px;">
        <button id="cancelBtn" style="padding:10px 16px; background:#ccc; border:none; border-radius:8px; cursor:pointer;">Batal</button>
        <button id="okBtn" style="padding:10px 16px; background:#0d6efd; color:#fff; border:none; border-radius:8px; cursor:pointer;">Buka</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("cancelBtn").onclick = () => overlay.remove();
  document.getElementById("okBtn").onclick = validatePassword;
}



/* ================================
   MD5 FUNCTION
================================ */
async function md5(str) {
  const buffer = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("MD5", buffer);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}



/* ================================
   PASSWORD VALIDATION
================================ */
async function validatePassword() {
  const val = document.getElementById("inputPass").value.trim();
  const hashed = await md5(val);

  if (hashed === correctHash) {
    unlock(true); // true = auto-open dokumen
    localStorage.setItem("unlock_time", Date.now());
    document.getElementById("popupOverlay").remove();
  } else {
    alert("Password salah.");
  }
}



/* ================================
   UNLOCK FUNCTION
================================ */
function unlock(openDocument = true) {
  lockBtn.textContent = "🔓 Akses Dibuka";
  lockBtn.classList.remove("locked");
  lockBtn.classList.add("unlocked");

  if (openDocument) {
    const path = window.location.pathname;

    if (path.includes("layanan")) window.open(layananLink, "_blank");
    if (path.includes("karir")) window.open(gajiLink, "_blank");
  }
}



/* ================================
   LOCK FUNCTION
================================ */
function lock() {
  lockBtn.textContent = "🔒 Akses Terkunci";
  lockBtn.classList.add("locked");
  lockBtn.classList.remove("unlocked");
}



/* ================================
   SISTEM KUNCI SILANG (24 JAM)
================================ */
(function kunciSilang() {
  const now = Date.now();

  // Jika di halaman layanan → cek apakah sudah buka karir
  if (window.location.pathname.includes("layanan")) {
    const openedKarir = localStorage.getItem("opened_karir");
    if (openedKarir && now - openedKarir < ONE_DAY) {
      lock();
    }
  }

  // Jika di halaman karir → cek apakah sudah buka layanan
  if (window.location.pathname.includes("karir")) {
    const openedLayanan = localStorage.getItem("opened_layanan");
    if (openedLayanan && now - openedLayanan < ONE_DAY) {
      lock();
    }
  }
})();
