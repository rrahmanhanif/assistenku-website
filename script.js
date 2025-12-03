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
// HALAMAN TERKUNCI
// =======================

const lockedPages = ["layanan.html", "karir.html"];
const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
  createLockButton();
}

function createLockButton() {
  const btn = document.createElement("button");
  btn.id = "lockBtn";
  btn.className = "lock-button locked";
  btn.innerHTML = "🔒 Akses Terkunci";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    showPasswordPopup();
  });
}



// =======================
// POPUP PASSWORD
// =======================
function showPasswordPopup() {
  const old = document.getElementById("popupOverlay");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.id = "popupOverlay";

  overlay.innerHTML = `
    <div class="popup-box">
      <h3>Masukkan Password</h3>
      <p>Halaman ini dilindungi. Masukkan password untuk membuka akses file.</p>

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
// MD5
// =======================
async function md5(str) {
  const buffer = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("MD5", buffer);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

const correctHash = "b3a793bcee664f645dd5bb58d60f89c8";



// =======================
// VALIDASI
// =======================
async function validatePassword() {
  const input = document.getElementById("userPassword").value.trim();
  const hashed = await md5(input);

  if (hashed === correctHash) {
    unlockAccess();
    document.getElementById("popupOverlay").remove();
  } else {
    alert("Password salah.");
  }
}



// =======================
// JIKA PASSWORD BENAR
// =======================
function unlockAccess() {
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
// ANTI INSPECT
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
