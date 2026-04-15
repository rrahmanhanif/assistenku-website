// tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();

// fallback gambar
document.querySelectorAll("img").forEach(img => {
  img.onerror = () => {
    img.src = "./assets/logo.png";
  };
});
