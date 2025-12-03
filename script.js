/* ================================
   HAMBURGER MENU
================================ */
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}


/* ================================
   CONSTANT LINKS
================================ */
const layananLink = "https://drive.google.com/file/d/1Hwzol_d_aAM0OGxPR_un04nPyTUrR5gW/view?usp=drivesdk";
const gajiLink = "https://drive.google.com/file/d/1UKaP7oSB11vBh2wI1u0qBCkwVF-YHEeD/view?usp=drivesdk";
const formulirLink = "https://drive.google.com/file/d/1tIxfDILacdYDjt6wg9VViPkugj31tvXJ/view?usp=drivesdk";


/* ================================
   BUTTON ELEMENTS
================================ */
const lockBtn = document.getElementById("lockBtn");
const btnBiayaLayanan = document.getElementById("btnBiayaLayanan");
const btnUnduhFormulir = document.getElementById("btnUnduhFormulir");
const btnSistemGaji = document.getElementById("btnSistemGaji");


/* ================================
   DISABLE / ENABLE BUTTON
================================ */
function disableBtn(btn) {
  if (!btn) return;
  btn.style.opacity = "0.5";
  btn.style.pointerEvents = "none";
}

function enableBtn(btn) {
  if (!btn) return;
  btn.style.opacity = "1";
  btn.style.pointerEvents = "auto";
}


/* ================================
   PASSWORD (MD5 HASH)
================================ */
const correctHash = "0f23ae0ee0fa9a1c81efc8d43f22c25d"; // "Hanif@123"


/* ================================
   INITIAL LOCK STATUS
================================ */
if (lockBtn) {
  const unlocked = localStorage.getItem("unlock_status");

  if (unlocked === "true") {
    unlock(false);
  } else {
    lock();
  }

  lockBtn.addEventListener("click", () => {
    if (lockBtn.classList.contains("locked")) {
      showPasswordPopup();
    } else {
      lock();
      localStorage.setItem("unlock_status", "false");
    }
  });
}


/* ================================
   ISLAND BUTTONS (SESUAI SKENARIO)
================================ */
if (btnBiayaLayanan) {
  btnBiayaLayanan.addEventListener("click", () => {
    window.open(layananLink, "_blank");

    // kunci silang → mark layanan dibuka
    localStorage.setItem("opened_layanan", "true");

    // langsung kunci tombol gaji
    disableBtn(btnSistemGaji);

    // kunci footer juga
    lock();
  });
}

if (btnUnduhFormulir) {
  btnUnduhFormulir.addEventListener("click", () => {
    window.open(formulirLink, "_blank");
  });
}

if (btnSistemGaji) {
  btnSistemGaji.addEventListener("click", () => {
    window.open(gajiLink, "_blank");

    // kunci silang → mark karir dibuka
    localStorage.setItem("opened_karir", "true");

    // langsung kunci tombol biaya layanan
    disableBtn(btnBiayaLayanan);

    // kunci footer juga
    lock();
  });
}


/* ================================
   PASSWORD POPUP
================================ */
function showPasswordPopup() {
  const overlay = document.createElement("div");
  overlay.id = "popupOverlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.5)";
  overlay.style.backdropFilter = "blur(8px)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
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
    unlock(false);
    localStorage.setItem("unlock_status", "true");
    document.getElementById("popupOverlay").remove();
  } else {
    alert("Password salah.");
  }
}


/* ================================
   UNLOCK FUNCTION
================================ */
function unlock() {
  lockBtn.textContent = "🔓 Akses Dibuka";
  lockBtn.classList.remove("locked");
  lockBtn.classList.add("unlocked");

  // enable both island buttons kembali
  enableBtn(btnBiayaLayanan);
  enableBtn(btnSistemGaji);
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
   SISTEM KUNCI SILANG (PAGE LOAD)
================================ */
(function kunciSilangAwal() {
  const openedLayanan = localStorage.getItem("opened_layanan") === "true";
  const openedKarir = localStorage.getItem("opened_karir") === "true";

  // Jika layanan pernah dibuka → sistem gaji terkunci
  if (openedLayanan) disableBtn(btnSistemGaji);

  // Jika gaji pernah dibuka → biaya layanan terkunci
  if (openedKarir) disableBtn(btnBiayaLayanan);
})();