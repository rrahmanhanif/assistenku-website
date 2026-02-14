document.addEventListener("DOMContentLoaded", function(){

  const yearEl = document.getElementById("year");
  if(yearEl){
    yearEl.textContent = new Date().getFullYear();
  }

  function renderProduk(data, containerId){
    const container = document.getElementById(containerId);
    if(!container) return;

    data.forEach(item=>{
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h4>${item.size}</h4>
        <div class="price">${item.price}</div>
        <a href="https://wa.me/6285186660020"
           target="_blank"
           class="btn-wa">
           Pesan via WA
        </a>
      `;

      container.appendChild(card);
    });
  }

  renderProduk([
    { size: "100g", price: "Rp 12.000" },
    { size: "250g", price: "Rp 28.000" },
    { size: "500g", price: "Rp 52.000" }
  ], "gorengGrid");

  renderProduk([
    { size: "500g", price: "Rp 18.000" },
    { size: "1kg", price: "Rp 34.000" }
  ], "mentahGrid");


  const navLinks = document.querySelectorAll(".bottom-nav a");

  navLinks.forEach(link=>{
    link.addEventListener("click", function(e){
      e.preventDefault();

      const targetId = this.getAttribute("href").replace("#","");
      const section = document.getElementById(targetId);

      if(section){
        section.scrollIntoView({ behavior: "smooth" });
      }

      navLinks.forEach(a=>a.classList.remove("active"));
      this.classList.add("active");
    });
  });

});
