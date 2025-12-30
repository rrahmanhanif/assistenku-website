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
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

/* =============================
   SMOOTH SCROLL
============================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 120,
        behavior: "smooth",
      });
    }
  });
});

/* =============================
   PDF BUTTONS (Only if exist)
============================= */
function openPDF(id, file) {
  const el = document.getElementById(id);
  if (el) el.onclick = () => window.open(file, "_blank");
}

openPDF("btnBiayaLayanan", "/penawaran.pdf");
openPDF("btnUnduhFormulir", "/formulir.pdf");

/* =============================
   PWA: ANDROID ONLY (STANDBY, NO GUIDE, NO "DEAD" BUTTON)
============================= */

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.warn);
  });
}

let deferredPrompt = null;

function setInstallButtonState(enabled) {
  const btn = document.getElementById("pwaInstallBtn");
  if (!btn) return;

  btn.disabled = !enabled;
  btn.style.opacity = enabled ? "1" : "0.6";
  btn.style.cursor = enabled ? "pointer" : "not-allowed";
}

// Default: tombol tampil tapi nonaktif sampai eligible
document.addEventListener("DOMContentLoaded", () => {
  setInstallButtonState(false);
});

// Eligible event dari Chrome
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  setInstallButtonState(true);
});

// Klik tombol
document.addEventListener("click", async (e) => {
  const t = e.target;
  if (!t || t.id !== "pwaInstallBtn") return;

  if (!deferredPrompt) return;

  // Setelah dipakai, langsung nonaktifkan agar tidak terasa "mati"
  setInstallButtonState(false);

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;

  deferredPrompt = null;
  // Setelah user memilih, tetap nonaktif (Chrome biasanya cooldown)
  setInstallButtonState(false);
});
