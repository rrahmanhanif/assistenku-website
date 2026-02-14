document.addEventListener("DOMContentLoaded", function(){

  // ==============================
  // Tahun otomatis
  // ==============================
  const yearEl = document.getElementById("year");
  if(yearEl){
    yearEl.textContent = new Date().getFullYear();
  }

  // ==============================
  // Render Produk (aman)
  // ==============================
  function renderProduk(data, containerId){
    const container = document.getElementById(containerId);
    if(!container) return;

    container.innerHTML = "";

    data.forEach(item=>{
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${item.size}</h3>
        <div class="price">${item.price}</div>
        <div class="card-actions">
          <a href="https://wa.me/6285186660020"
             target="_blank"
             class="btn btn-wa">
             WA
          </a>
        </div>
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


  // ==============================
  // Mobile Bottom Navigation (stabil)
  // ==============================
  const navLinks = document.querySelectorAll(".bottom-nav a");

  if(navLinks.length){

    navLinks.forEach(link=>{
      link.addEventListener("click", function(e){

        // Ambil target dari data-target atau dari href
        let targetId = this.getAttribute("data-target");

        if(!targetId){
          const href = this.getAttribute("href");
          if(href && href.startsWith("#")){
            targetId = href.replace("#","");
          }
        }

        if(!targetId) return;

        const section = document.getElementById(targetId);
        if(!section) return;

        e.preventDefault();

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        navLinks.forEach(a=>a.classList.remove("active"));
        this.classList.add("active");

      });
    });

  }

});
