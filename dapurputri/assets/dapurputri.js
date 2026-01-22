(function () {
  "use strict";

  const WHATSAPP_BASE = "https://wa.me/6285186660020";
  const EMAIL_TO = "rahmadanip88@gmail.com";

  const PAKET_7_HARI = [
    {
      day: "Hari 1",
      tag: "Paket Harian",
      items: ["Nasi putih", "Ayam kecap manis", "Tumis buncis wortel", "Tahu goreng", "Sambal"],
      price: "Rp25.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 1 (Ayam kecap)."
    },
    {
      day: "Hari 2",
      tag: "Paket Harian",
      items: ["Nasi putih", "Ikan balado", "Sayur bening bayam", "Tempe orek"],
      price: "Rp26.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 2 (Ikan balado)."
    },
    {
      day: "Hari 3",
      tag: "Paket Harian",
      items: ["Nasi putih", "Ayam goreng lengkuas", "Capcay kuah", "Telur dadar"],
      price: "Rp29.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 3 (Ayam goreng lengkuas)."
    },
    {
      day: "Hari 4",
      tag: "Paket Harian",
      items: ["Nasi putih", "Semur ayam", "Tumis kangkung", "Perkedel kentang"],
      price: "Rp29.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 4 (Semur ayam)."
    },
    {
      day: "Hari 5",
      tag: "Paket Harian",
      items: ["Nasi putih", "Ayam sambal matah", "Sayur lodeh", "Tempe goreng"],
      price: "Rp26.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 5 (Sambal matah)."
    },
    {
      day: "Hari 6",
      tag: "Paket Harian",
      items: ["Nasi putih", "Rendang ayam", "Tumis sawi", "Tahu goreng"],
      price: "Rp29.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 6 (Rendang ayam)."
    },
    {
      day: "Hari 7",
      tag: "Paket Harian",
      items: ["Nasi putih", "Soto ayam", "Perkedel kentang", "Kerupuk"],
      price: "Rp26.000 / box",
      waText: "Halo Dapur Putri, saya ingin pesan Paket Hari 7 (Soto ayam)."
    }
  ];

  function qs(id) { return document.getElementById(id); }

  function el(tag, className, text) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function waLink(text) {
    const t = encodeURIComponent(text);
    return `${WHATSAPP_BASE}?text=${t}`;
  }

  function renderPaket() {
    const grid = qs("paketGrid");
    if (!grid) return;

    PAKET_7_HARI.forEach((m) => {
      const card = el("article", "card");

      const head = el("div", "paket-title");
      head.appendChild(el("h4", "", m.day));
      head.appendChild(el("span", "badge", m.tag));

      const ul = el("ul", "menu-list");
      m.items.forEach((it) => {
        const li = el("li", "", it);
        ul.appendChild(li);
      });

      const bottom = el("div", "bottom");
      bottom.appendChild(el("span", "price", m.price));

      const order = el("a", "btn", "Order");
      order.href = waLink(m.waText);
      order.target = "_blank";
      order.rel = "noopener";
      bottom.appendChild(order);

      const priceBox = el("div", "paket-price", m.price);

      card.appendChild(head);
      card.appendChild(ul);
      card.appendChild(bottom);
      card.appendChild(priceBox);

      grid.appendChild(card);
    });
  }

  function buildCopyText() {
    const lines = [];
    lines.push("Paket Catering 7 Hari — Dapur Putri");
    lines.push("");
    PAKET_7_HARI.forEach((m) => {
      lines.push(`${m.day}`);
      m.items.forEach((it) => lines.push(`- ${it}`));
      lines.push(`Harga: ${m.price}`);
      lines.push("");
    });
    lines.push("Paket Langganan: 7 Hari Rp180.000 / pax");
    lines.push("Minimal order: 10 box / hari");
    lines.push("Free sambal. Request pedas & pantangan makanan bisa.");
    lines.push(`WhatsApp: +62 851-8666-0020`);
    lines.push(`Email: ${EMAIL_TO}`);
    return lines.join("\n");
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  function wireActions() {
    const year = qs("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const btnCopy = qs("copyPaket");
    if (btnCopy) {
      btnCopy.addEventListener("click", async () => {
        const ok = await copyText(buildCopyText());
        const prev = btnCopy.textContent;
        btnCopy.textContent = ok ? "Tersalin" : "Gagal";
        setTimeout(() => (btnCopy.textContent = prev), 1200);
      });
    }

    const btnPrint = qs("printPage");
    if (btnPrint) {
      btnPrint.addEventListener("click", () => window.print());
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderPaket();
    wireActions();
  });
})();
