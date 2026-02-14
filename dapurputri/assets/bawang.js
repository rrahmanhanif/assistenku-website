document.addEventListener("DOMContentLoaded", function(){

// Tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();

// Data produk goreng
const gorengData = [
  { size: "100g", price: "Rp 12.000" },
  { size: "250g", price: "Rp 28.000" },
  { size: "500g", price: "Rp 52.000" }
];

const mentahData = [
  { size: "500g", price: "Rp 18.000" },
  { size: "1kg", price: "Rp 34.000" }
];

function renderProduk(data, containerId){
  const container = document.getElementById(containerId);

  data.forEach(item=>{
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.size}</h3>
      <div class="price">${item.price}</div>
      <div class="card-actions">
        <a href="https://wa.me/6285186660020" target="_blank" class="btn btn-wa">WA</a>
      </div>
    `;

    container.appendChild(card);
  });
}

renderProduk(gorengData, "gorengGrid");
renderProduk(mentahData, "mentahGrid");

// Mobile nav scroll
document.querySelectorAll(".bottom-nav a").forEach(link=>{
  link.addEventListener("click", function(){
    const target = this.getAttribute("data-target");
    const section = document.getElementById(target);

    if(section){
      section.scrollIntoView({ behavior: "smooth" });
    }

    document.querySelectorAll(".bottom-nav a")
      .forEach(a=>a.classList.remove("active"));

    this.classList.add("active");
  });
});

});
