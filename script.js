// ===== LOCK UNLOCK SYSTEM =====
function updateLockState() {
  const currentPage = window.location.pathname;

  const layananBtn = document.getElementById("navLayanan");
  const karirBtn = document.getElementById("navKarir");

  if (!layananBtn || !karirBtn) return;

  // Jika sedang di halaman layanan → karir terkunci
  if (currentPage.includes("layanan")) {
    localStorage.setItem("akses_layanan", "true");
    localStorage.removeItem("akses_karir");

    karirBtn.classList.add("locked");
    karirBtn.onclick = (e) => e.preventDefault();

  // Jika sedang di halaman karir → layanan terkunci
  } else if (currentPage.includes("karir")) {
    localStorage.setItem("akses_karir", "true");
    localStorage.removeItem("akses_layanan");

    layananBtn.classList.add("locked");
    layananBtn.onclick = (e) => e.preventDefault();

  // Beranda / profil / kontak → reset
  } else {
    localStorage.removeItem("akses_layanan");
    localStorage.removeItem("akses_karir");
  }
}

document.addEventListener("DOMContentLoaded", updateLockState);

// ===== MOBILE MENU =====
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");

if (menuIcon && mobileMenu) {
  menuIcon.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}
