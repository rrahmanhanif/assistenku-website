/* =========================================================
   ASSISTENKU — SCRIPT FINAL
========================================================= */

/* =========================================================
   1. MOBILE MENU
========================================================= */
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });

  // Tutup menu ketika klik link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
    });
  });
}



/* =========================================================
   2. NAVBAR AUTO-HIDE
========================================================= */
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.classList.add("hide");
  } else {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});



/* =========================================================
   3. LOCK SYSTEM — HALAMAN TERKUNCI
========================================================= */

// halaman yg dikunci
const lockedPages = ["layanan.html", "karir.html"];

// nama file halaman
const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
  attachLockButton();
}

function attachLockButton() {
  const btn = document.getElementById("lockBtn");
  if (!btn) return;

  btn.classList.add("locked");
  btn.innerHTML = "🔒 Akses Terkunci";

  btn.addEventListener("click", () => {
    showPasswordPopup();
  });
}



/* =========================================================
   4. POPUP PASSWORD
========================================================= */
function showPasswordPopup() {
  const old = document.getElementById("popupOverlay");
  if (old) old.remove();

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



/* =========================================================
   5. MD5 — HASH PASSWORD
========================================================= */
async function md5(str) {
  const buffer = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("MD5", buffer);

  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Password = assistenku2025
const correctHash = "b3a793bcee664f645dd5bb58d60f89c8";



/* =========================================================
   6. VALIDASI PASSWORD
========================================================= */
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



/* =========================================================
   7. AKSI SETELAH PASSWORD BENAR
========================================================= */
function unlockAccess() {
  const btn = document.getElementById("lockBtn");
  if (!btn) return;

  btn.classList.remove("locked");
  btn.classList.add("unlocked");
  btn.innerHTML = "🔓 Akses Dibuka";

  // redirect sesuai halaman
  if (currentPage === "layanan.html") {
    window.location.href =
      "https://drive.google.com/file/d/1Hwzol_d_aAM0OGxPR_un04nPyTUrR5gW/view?usp=drivesdk";
  }

  if (currentPage === "karir.html") {
    window.location.href =
      "https://drive.google.com/file/d/1UKaP7oSB11vBh2wI1u0qBCkwVF-YHEeD/view?usp=drivesdk";
  }
}



/* =========================================================
   8. ANTI INSPECT — SAFE MODE
========================================================= */
document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
