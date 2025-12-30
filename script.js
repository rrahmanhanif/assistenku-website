/* =============================
   MOBILE MENU
============================= */

const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Auto close after clicking link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

/* =============================
   SMOOTH SCROLL
============================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 120,
        behavior: "smooth"
      });
    }
  });
});

/* =============================
   PDF BUTTONS (Only if exist)
============================= */
function openPDF(id, file) {
  const el = document.getElementById(id);
  if (el) {
    el.onclick = () => window.open(file, "_blank");
  }
}

openPDF("btnBiayaLayanan", "/penawaran.pdf");
openPDF("btnUnduhFormulir", "/formulir.pdf");
/* =============================
   PWA: SERVICE WORKER + INSTALL
============================= */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.warn);
  });
}

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("installAppBtn");
  if (btn) btn.style.display = "inline-block";
});

window.installAssistenku = async function () {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;

  const btn = document.getElementById("installAppBtn");
  if (btn) btn.style.display = "none";
};

/* =============================
   PWA: STANDBY INSTALL (MODE A)
============================= */

let deferredPrompt = null;

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
}

function openInstallHelp() {
  const modal = document.getElementById("installHelpModal");
  if (modal) modal.style.display = "block";
}

function closeInstallHelp() {
  const modal = document.getElementById("installHelpModal");
  if (modal) modal.style.display = "none";
}

// Tangkap event install dari browser (kalau Chrome mengizinkan)
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Optional: ubah label tombol biar lebih jelas saat eligible
  const btn = document.getElementById("installAppBtn");
  if (btn) btn.textContent = "Install App";
});

// Klik tombol Install: prompt jika tersedia, kalau tidak tampilkan panduan
document.addEventListener("click", async (e) => {
  if (e.target && e.target.id === "installAppBtn") {
    if (isStandaloneMode()) return; // sudah terpasang

    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      return;
    }

    openInstallHelp();
  }

  if (e.target && e.target.id === "closeInstallHelp") {
    closeInstallHelp();
  }

  if (e.target && e.target.id === "installHelpModal") {
    closeInstallHelp();
  }
});
