/* =============================  
   MOBILE MENU  
============================= */  
const menuIcon = document.getElementById("menuIcon");  
const mobileMenu = document.getElementById("mobileMenu");  

if (menuIcon && mobileMenu) {  
  menuIcon.addEventListener("click", () => {  
    mobileMenu.classList.toggle("active");  
  });  

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
   PDF BUTTONS  
============================= */  
function openPDF(id, file) {  
  const el = document.getElementById(id);  
  if (el) el.onclick = () => window.open(file, "_blank");  
}  

openPDF("btnBiayaLayanan", "/penawaran.pdf");  
openPDF("btnUnduhFormulir", "/formulir.pdf");  


/* =============================  
   PWA INSTALL  
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

document.addEventListener("DOMContentLoaded", () => {  
  setInstallButtonState(false);  
});  

window.addEventListener("beforeinstallprompt", (e) => {  
  e.preventDefault();  
  deferredPrompt = e;  
  setInstallButtonState(true);  
});  

document.addEventListener("click", async (e) => {  
  if (e.target?.id !== "pwaInstallBtn") return;  
  if (!deferredPrompt) return;  

  setInstallButtonState(false);  

  deferredPrompt.prompt();  
  await deferredPrompt.userChoice;  

  deferredPrompt = null;  
  setInstallButtonState(false);  
});  


/* =============================  
   IMAGE MODAL  
============================= */  
const modal = document.getElementById("imageModal");  
const modalImg = document.getElementById("modalImg");  
const images = document.querySelectorAll(".legal-card-img");  
const modalCloseBtn = document.querySelector(".close");  

let zoom = 1;  

images.forEach(img => {  
  img.addEventListener("click", () => {  
    if (!modal || !modalImg) return;  

    modal.style.display = "block";  
    modalImg.src = img.src;  
    zoom = 1;  
    modalImg.style.transform = "scale(1)";  
  });  
});  

if (modalCloseBtn && modal) {  
  modalCloseBtn.onclick = () => modal.style.display = "none";  
}  

if (modal && modalImg) {  
  modal.onclick = (e) => {  
    if (e.target !== modalImg) {  
      modal.style.display = "none";  
    }  
  };  
}  

if (modalImg) {  
  modalImg.onclick = () => {  
    zoom = zoom === 1 ? 2 : 1;  
    modalImg.style.transform = `scale(${zoom})`;  
  };  
}  

if (modal && modalImg) {  
  modal.addEventListener("wheel", (e) => {  
    e.preventDefault();  

    zoom += e.deltaY < 0 ? 0.2 : -0.2;  
    zoom = Math.min(Math.max(zoom, 1), 5);  

    modalImg.style.transform = `scale(${zoom})`;  
  });  
}  


/* =============================  
   KBLI POPUP (FULLSCREEN)  
============================= */  
window.addEventListener("load", () => {  
  const popup = document.getElementById("kbliPopup");  
  const closePopupBtn = document.getElementById("closeKbli");  

  if (!popup) return;  

  // Tampilkan popup  
  popup.style.display = "flex";  

  // Tombol close  
  if (closePopupBtn) {  
    closePopupBtn.addEventListener("click", () => {  
      popup.style.display = "none";  
    });  
  }  

  // Klik luar = close  
  popup.addEventListener("click", (e) => {  
    if (e.target === popup) {  
      popup.style.display = "none";  
    }  
  });  
});
