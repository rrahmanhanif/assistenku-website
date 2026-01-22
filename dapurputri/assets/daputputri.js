(function () {
  "use strict";

  const MENUS = [
    {
      day: "Hari 1",
      items: ["Nasi putih", "Ayam kecap manis", "Tumis buncis wortel", "Tahu goreng", "Sambal"],
      price: "Rp25.000 / box"
    },
    {
      day: "Hari 2",
      items: ["Nasi putih", "Ikan balado", "Sayur bening bayam", "Tempe orek"],
      price: "Rp26.000 / box"
    },
    {
      day: "Hari 3",
      items: ["Nasi putih", "Ayam goreng lengkuas", "Capcay kuah", "Telur dadar"],
      price: "Rp29.000 / box"
    },
    {
      day: "Hari 4",
      items: ["Nasi putih", "Semur ayam", "Tumis kangkung", "Perkedel kentang"],
      price: "Rp29.000 / box"
    },
    {
      day: "Hari 5",
      items: ["Nasi putih", "Ayam sambal matah", "Sayur lodeh", "Tempe goreng"],
      price: "Rp26.000 / box"
    },
    {
      day: "Hari 6",
      items: ["Nasi putih", "Rendang ayam", "Tumis sawi", "Tahu goreng"],
      price: "Rp29.000 / box"
    },
    {
      day: "Hari 7",
      items: ["Nasi putih", "Soto ayam", "Perkedel kentang", "Kerupuk"],
      price: "Rp26.000 / box"
    }
  ];

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderCards() {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;

    MENUS.forEach((m) => {
      const card = el("article", "card");
      const title = el("h3", "", m.day);

      const menuWrap = el("div", "menu");
      m.items.forEach((it) => {
        const row = el("div", "item");
        row.appendChild(el("span", "dot"));
        row.appendChild(el("span", "txt", it));
        menuWrap.appendChild(row);
      });

      const price = el("div", "price", m.price);

      card.appendChild(title);
      card.appendChild(menuWrap);
      card.appendChild(price);
      grid.appendChild(card);
    });
  }

  function buildWhatsappText() {
    const lines = [];
    lines.push("Paket Catering Harian (7 Hari)");
    lines.push("");
    MENUS.forEach((m) => {
      lines.push(`${m.day}`);
      m.items.forEach((it) => lines.push(`- ${it}`));
      lines.push(`Harga: ${m.price}`);
      lines.push("");
    });
    lines.push("Paket Langganan: 7 Hari Rp180.000 / pax");
    lines.push("Minimal order: 10 box / hari");
    lines.push("Free sambal. Bisa request level pedas & pantangan makanan.");
    return lines.join("\n");
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // fallback
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
    const btnCopy = document.getElementById("btnCopyText");
    if (btnCopy) {
      btnCopy.addEventListener("click", async () => {
        const text = buildWhatsappText();
        const ok = await copyToClipboard(text);
        btnCopy.textContent = ok ? "Tersalin" : "Gagal menyalin";
        setTimeout(() => (btnCopy.textContent = "Salin Paket untuk WhatsApp"), 1400);
      });
    }

    const btnPrint = document.getElementById("btnPrint");
    if (btnPrint) {
      btnPrint.addEventListener("click", () => window.print());
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCards();
    wireActions();
  });
})();
