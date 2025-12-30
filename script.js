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
   PWA: SERVICE WORKER + ANDROID INSTALL + iOS HINT
   - Single source of truth (no duplicates)
   - Uses:
     - Android button: #pwaInstallBtn
     - iOS hint: #iosInstallHint
============================= */

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.warn);
  });
}

/* -----------------------------
   Platform detection
----------------------------- */
function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

// Detect "standalone" (installed PWA)
function isStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

/* -----------------------------
   Android install prompt
----------------------------- */
let deferredPrompt = null;

// Show Android install button only when eligible and not iOS
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (!isIOS()) {
    const btn = document.getElementById("pwaInstallBtn");
    if (btn) btn.style.display = "inline-block";
  }
});

// Click handler for Android install button
document.addEventListener("click", async (e) => {
  const t = e.target;
  if (!t || t.id !== "pwaInstallBtn") return;

  // If already installed / standalone, do nothing
  if (isStandaloneMode()) return;

  // If not eligible yet, do nothing (normal)
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;

  // Optional: hide button after prompt used
  const btn = document.getElementById("pwaInstallBtn");
  if (btn) btn.style.display = "none";
});

/* -----------------------------
   iOS hint
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // iOS: show hint only if not installed yet
  if (isIOS() && !isStandaloneMode()) {
    const iosHint = document.getElementById("iosInstallHint");
    if (iosHint) iosHint.style.display = "block";

    // Ensure Android button hidden on iOS
    const btn = document.getElementById("pwaInstallBtn");
    if (btn) btn.style.display = "none";
  }
});
