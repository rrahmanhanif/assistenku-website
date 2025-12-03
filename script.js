// ===== MOBILE MENU =====
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.querySelector(".main-nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// ===== LOCK / UNLOCK SYSTEM =====
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // Halaman layanan membuka → karir terkunci
  if (path.includes("layanan")) {
    localStorage.setItem("lockKarir", "true");
  }

  // Halaman karir membuka → layanan terkunci
  if (path.includes("karir")) {
    localStorage.setItem("lockLayanan", "true");
  }

  const linkLayanan = document.querySelector("a[href='layanan.html']");
  const linkKarir   = document.querySelector("a[href='karir.html']");

  if (localStorage.getItem("lockLayanan") === "true" && linkLayanan) {
    linkLayanan.classList.add("locked");
    linkLayanan.onclick = (e) => {
      e.preventDefault();
      alert("Halaman Layanan terkunci setelah membuka Karir.");
    };
  }

  if (localStorage.getItem("lockKarir") === "true" && linkKarir) {
    linkKarir.classList.add("locked");
    linkKarir.onclick = (e) => {
      e.preventDefault();
      alert("Halaman Karir terkunci setelah membuka Layanan.");
    };
  }
});
