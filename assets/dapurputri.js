// Tahun footer
(() => {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
})();

// SCROLL BOOST: saat user scroll, kurangi beban repaint sementara.
// Menggunakan event passive + timeout kecil agar ringan.
(() => {
  let t = null;
  const root = document.documentElement;

  const onScroll = () => {
    root.classList.add("is-scrolling");
    if (t) clearTimeout(t);
    t = setTimeout(() => root.classList.remove("is-scrolling"), 140);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
})();
