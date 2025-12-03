// =======================
// MOBILE NAVIGATION
// =======================
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}



// =======================
// LOCK / UNLOCK SYSTEM
// =======================

// Halaman yang memerlukan password
const lockedPages = ["layanan.html", "karir.html"];

// Cek halaman saat ini
const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
  insertLockButton();
}

function insertLockButton() {
  const lockBtn = document.createElement("button");
  lockBtn.id = "lockBtn";
  lockBtn.className = "lock-button locked";
  lockBtn.innerHTML = "🔒 Akses Terkunci";

  document.body.appendChild(lockBtn);

  lockBtn.addEventListener("click", () => {
    showPasswordPopup();
  });
}



// =======================
// POPUP PASSWORD
// =======================

function showPasswordPopup() {
  const existing = document.getElementById("popupOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "popupOverlay";

  overlay.innerHTML = `
    <div class="popup-box">
      <h3>Masukkan Password</h3>
      <p>Halaman ini dilindungi. Masukkan password untuk membuka akses.</p>

      <input type="password" id="userPassword" placeholder="Password">

      <div class="popup-actions">
        <button id="cancelPopup">Batal</button>
        <button id="confirmPass">Buka</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("cancelPopup").onclick = () => overlay.remove();
  document.getElementById("confirmPass").onclick = validatePassword;
}



// =======================
// MD5 INTERNAL (Tanpa CryptoJS)
// =======================

function md5(str) {
  return crypto.subtle.digest("MD5", new TextEncoder().encode(str))
    .then(buf => {
      return Array.from(new Uint8Array(buf))
        .map(x => x.toString(16).padStart(2, "0"))
        .join("");
    });
}

// Hash password (MD5 dari: assistenku2025)
const correctHash = "b3a793bcee664f645dd5bb58d60f89c8";



// =======================
// VALIDASI PASSWORD
// =======================

async function validatePassword() {
  const pass = document.getElementById("userPassword").value.trim();
  const overlay = document.getElementById("popupOverlay");

  const hashed = await md5(pass);

  if (hashed === correctHash) {
    unlockSuccess();
    if (overlay) overlay.remove();
  } else {
    alert("Password salah.");
  }
}



// =======================
// UNLOCK SUCCESS
// =======================

function unlockSuccess() {
  const btn = document.getElementById("lockBtn");

  btn.classList.remove("locked");
  btn.classList.add("unlocked");
  btn.innerHTML = "🔓 Akses Dibuka";

  if (currentPage === "layanan.html") {
    window.location.href =
      "https://drive.google.com/file/d/1Hwzol_d_aAM0OGxPR_un04nPyTUrR5gW/view";
  }

  if (currentPage === "karir.html") {
    window.location.href =
      "https://drive.google.com/file/d/1UKaP7oSB11vBh2wI1u0qBCkwVF-YHEeD/view";
  }
}



// =======================
// ANTI INSPECT ELEMENT
// =======================

document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
