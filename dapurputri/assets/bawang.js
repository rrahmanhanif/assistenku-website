document.addEventListener("DOMContentLoaded", function(){

  const phone = "6285186660020";
  const email = "rahmadanip88@gmail.com";

  const gorengProducts = [
    { name:"100g Plastik", price:"Rp 25.000" },
    { name:"250g Toples", price:"Rp 62.000" },
    { name:"500g Toples", price:"Rp 125.000" }
  ];

  const mentahProducts = [
    { name:"100g Plastik", price:"Rp 8.500" },
    { name:"250g Plastik", price:"Rp 19.000" },
    { name:"500g Plastik", price:"Rp 36.000" }
  ];

  function renderProducts(products, containerId, category){

    const container = document.getElementById(containerId);

    products.forEach(p => {

      const card = document.createElement("div");
      card.className = "card";

      const waText = encodeURIComponent(
        `Halo Dapur Putri, saya ingin pesan ${category} ${p.name}.`
      );

      const mailSubject = encodeURIComponent(
        `Pemesanan ${category} ${p.name}`
      );

      card.innerHTML = `
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <div class="card-actions">
          <a class="btn btn-wa"
             href="https://wa.me/${phone}?text=${waText}"
             target="_blank">WhatsApp</a>

          <a class="btn btn-email"
             href="mailto:${email}?subject=${mailSubject}"
             target="_blank">Email</a>
        </div>
      `;

      container.appendChild(card);
    });
  }

  renderProducts(gorengProducts, "gorengGrid", "Bawang Goreng");
  renderProducts(mentahProducts, "mentahGrid", "Bawang Iris Mentah");

  document.getElementById("year").textContent =
    new Date().getFullYear();

});
