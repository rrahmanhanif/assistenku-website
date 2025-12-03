// =======================
// SISTEM LOCK / UNLOCK
// =======================

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname;

  const lockBtn = document.createElement("button");
  lockBtn.id = "lockButton";
  lockBtn.style.position = "fixed";
  lockBtn.style.bottom = "20px";
  lockBtn.style.right = "20px";
  lockBtn.style.padding = "12px 18px";
  lockBtn.style.borderRadius = "10px";
  lockBtn.style.border = "none";
  lockBtn.style.color = "white";
  lockBtn.style.fontSize = "16px";
  lockBtn.style.cursor = "pointer";
  lockBtn.style.zIndex = "9999";
  document.body.appendChild(lockBtn);

  // ==========================
  //  UPDATE STATUS (UI)
  // ==========================
  function updateButton() {
    const unlocked = localStorage.getItem("akses_unlock") === "true";

    if (unlocked) {
      lockBtn.textContent = "UNLOCKED ✓";
      lockBtn.style.backgroundColor = "#22c55e"; // hijau
    } else {
      lockBtn.textContent = "LOCKED ✗";
      lockBtn.style.backgroundColor = "#ef4444"; // merah
    }
  }

  updateButton();

  // ==========================
  //  EVENT KLIK LOCK BUTTON
  // ==========================
  lockBtn.addEventListener("click", () => {
    const unlocked = localStorage.getItem("akses_unlock") === "true";

    // Jika masih terkunci → minta password
    if (!unlocked) {
      const input = prompt("Masukkan Password untuk Unlock:");

      if (input === "Hanif@123") {
        localStorage.setItem("akses_unlock", "true");
        alert("Akses berhasil dibuka.");
        updateButton();
      } else {
        alert("Password salah!");
      }
      return;
    }

    // Jika sedang unlock → kunci kembali
    if (unlocked) {
      const konfirmasi = confirm("Kunci kembali akses?");
      if (konfirmasi) {
        localStorage.removeItem("akses_unlock");
        alert("Akses telah dikunci kembali.");
        updateButton();
      }
    }
  });

  // ==========================
  // PROTEKSI LINK GDRIVE
  // ==========================

  function protectLink(selector) {
    const link = document.querySelector(selector);
    if (!link) return;

    link.addEventListener("click", (e) => {
      const unlocked = localStorage.getItem("akses_unlock") === "true";

      if (!unlocked) {
        e.preventDefault();
        alert("Akses dikunci. Silakan tekan tombol LOCK/UNLOCK dan masukkan password.");
      }
    });
  }

  // Proteksi link KARIR
  if (currentPage.includes("karir")) {
    protectLink(`a[href*="1UKaP7oSB11vBh2wI1u0qBCkwVF-YHEeD"]`);
  }

  // Proteksi link LAYANAN
  if (currentPage.includes("layanan")) {
    protectLink(`a[href*="1Hwzol_d_aAM0OGxPR_un04nPyTUrR5gW"]`);
  }
});


// =======================
// MOBILE MENU
// =======================
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}
