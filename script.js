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
   LOCK / UNLOCK SYSTEM
================================ */
const lockBtn = document.getElementById("lockBtn");

// Link GDrive halaman layanan & karir
const layananLink = "https://drive.google.com/file/d/1Hwzol_d_aAM0OGxPR_un04nPyTUrR5gW/view?usp=drivesdk";
const gajiLink = "https://drive.google.com/file/d/1UKaP7oSB11vBh2wI1u0qBCkwVF-YHEeD/view?usp=drivesdk";

// 24 jam lock timer
const ONE_DAY = 24 * 60 * 60 * 1000;

if (lockBtn) {
  let unlockedAt = localStorage.getItem("unlock_time");
  let now = Date.now();

  // Jika sudah lebih dari 24 jam → kunci ulang
  if (unlockedAt && now - unlockedAt > ONE_DAY) {
    localStorage.removeItem("unlock_time");
    unlockedAt = null;
  }

  // Set status awal
  if (unlockedAt) {
    unlock();
  } else {
    lock();
  }

  lockBtn.addEventListener("click", () => {
    if (lockBtn.classList.contains("locked")) {
      unlock();
      localStorage.setItem("unlock_time", Date.now());
    } else {
      lock();
      localStorage.removeItem("unlock_time");
    }
  });
}

/* ===== FUNCTIONS ===== */

function unlock() {
  lockBtn.textContent = "🔓 Akses Dibuka";
  lockBtn.classList.remove("locked");
  lockBtn.classList.add("unlocked");

  const path = window.location.pathname;

  if (path.includes("layanan")) {
    window.open(layananLink, "_blank");
  }

  if (path.includes("karir")) {
    window.open(gajiLink, "_blank");
  }
}

function lock() {
  lockBtn.textContent = "🔒 Akses Terkunci";
  lockBtn.classList.add("locked");
  lockBtn.classList.remove("unlocked");
}
