// Tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();

// Fallback jika gambar gagal load
document.querySelectorAll("img").forEach(img => {
  img.onerror = () => {
    img.src = "./assets/logo.png";
  };
});
