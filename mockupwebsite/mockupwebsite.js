(function () {
  const search = document.getElementById("sectorSearch");
  const grid = document.getElementById("sectorGrid");
  const category = document.getElementById("categorySelect");
  const reset = document.getElementById("resetFilters");
  const summary = document.getElementById("filterSummary");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".sector-card"));
  const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

  // Mapping kategori -> daftar sektor
  const MAP = {
    umkm: ["S01", "S06", "S07", "S09", "S15", "S17"],
    pro:  ["S02", "S04", "S05", "S08", "S10", "S11", "S12", "S13", "S14", "S16"],

    kuliner: ["S09"],
    toko: ["S07", "S09", "S01"],
    jasa: ["S06", "S17", "S13", "S10"],
    logistik: ["S08"],
    teknologi: ["S10"],
    keuangan: ["S11"],
    properti: ["S12"],
    pemerintah: ["S14"],
    kesehatan: ["S16"],
    edukasi: ["S15"],
    energi: ["S04", "S05", "S02"]
  };

  // Kata kunci -> rekomendasi kategori (synonym sederhana)
  const SUGGEST = [
    { cat: "pemerintah", keys: ["pemerintah","kelembagaan","instansi","dinas","pemda","kementerian","birokrasi","government","regulasi","perizinan"] },
    { cat: "logistik", keys: ["logistik","transport","pengiriman","kurir","warehouse","gudang","ekspedisi","cargo","armada","pergudangan"] },
    { cat: "kuliner", keys: ["kuliner","makan","minum","resto","cafe","katering","catering","kopi","bakery","roti","warung","f&b","food"] },
    { cat: "toko", keys: ["toko","retail","grosir","dagang","perdagangan","market","minimarket","online shop","olshop","produk"] },
    { cat: "kesehatan", keys: ["kesehatan","klinik","dokter","rumah sakit","rs","apotik","farmasi","medical","care","perawatan"] },
    { cat: "edukasi", keys: ["pendidikan","kursus","bimbel","les","pelatihan","sekolah","akademi","training"] },
    { cat: "keuangan", keys: ["keuangan","asuransi","finance","pinjaman","kredit","pembayaran","bank","investasi"] },
    { cat: "teknologi", keys: ["teknologi","it","digital","software","aplikasi","website","komunikasi","internet","startup"] },
    { cat: "properti", keys: ["properti","real estat","real estate","kontrakan","sewa","kos","apartemen","rumah","kavling"] },
    { cat: "energi", keys: ["energi","listrik","gas","utility","utilitas","pln","pipa","air limbah","limbah","sanitasi"] },
    { cat: "jasa", keys: ["jasa","konsultan","service","layanan","vendor","outsourcing","profesional"] },
    { cat: "umkm", keys: ["umkm","usaha kecil","mikro","warung","rumahan","home industry"] },
    { cat: "pro", keys: ["enterprise","korporat","b2b","tender","compliance","audit"] }
  ];

  // Buat box rekomendasi (dibuat via JS, tidak perlu edit HTML)
  let recoBox = null;
  function ensureRecoBox() {
    if (recoBox) return recoBox;
    recoBox = document.createElement("div");
    recoBox.id = "recoBox";
    recoBox.style.marginTop = "10px";
    recoBox.style.padding = "12px";
    recoBox.style.border = "1px solid rgba(15,23,42,.10)";
    recoBox.style.borderRadius = "14px";
    recoBox.style.background = "rgba(255,255,255,.75)";
    recoBox.style.display = "none";
    // taruh setelah filterSummary (paling dekat dengan filter)
    if (summary && summary.parentElement) {
      summary.parentElement.appendChild(recoBox);
    } else if (grid.parentElement) {
      grid.parentElement.insertBefore(recoBox, grid);
    }
    return recoBox;
  }

  function findSuggestion(q) {
    const qq = norm(q);
    if (!qq) return null;

    // scoring sederhana: hitung berapa keyword yang match
    let best = null;
    let bestScore = 0;

    for (const rule of SUGGEST) {
      let score = 0;
      for (const k of rule.keys) {
        const kk = norm(k);
        // match: substring dua arah (q mengandung k atau k mengandung q)
        if (qq.includes(kk) || kk.includes(qq)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        best = rule.cat;
      }
    }

    // Minimal 1 match sudah cukup untuk rekomendasi
    return bestScore > 0 ? best : null;
  }

  function apply() {
    const q = search ? norm(search.value) : "";
    const cat = category ? category.value : "";
    const allow = cat ? new Set(MAP[cat] || []) : null;

    let visibleCount = 0;

    cards.forEach((card) => {
      const code = (card.getAttribute("data-sector") || "").trim(); // ex: S07
      const title = norm(card.getAttribute("data-title"));
      const text = norm(card.innerText);

      // pencarian: match title / kode / teks
      const okSearch = !q || title.includes(q) || code.toLowerCase().includes(q) || text.includes(q);
      const okCat = !allow || allow.has(code);

      const ok = okSearch && okCat;
      card.style.display = ok ? "" : "none";
      if (ok) visibleCount++;
    });

    // summary
    if (summary) {
      const label = (category && cat)
        ? category.options[category.selectedIndex].text
        : "Semua sektor";
      const extra = q ? ` • Cari: "${q}"` : "";
      summary.textContent = `${visibleCount} sektor ditampilkan • ${label}${extra}`;
    }

    // rekomendasi jika 0 hasil
    const box = ensureRecoBox();
    if (visibleCount === 0 && q) {
      const sug = findSuggestion(q);

      const catLabel = (cat && category)
        ? category.options[category.selectedIndex].text
        : "Semua sektor";

      if (sug && category) {
        const optText = Array.from(category.options).find(o => o.value === sug)?.text || "Kategori terkait";
        box.innerHTML = `
          <div style="font-weight:800; margin-bottom:6px;">Tidak ada hasil untuk "${q}"</div>
          <div style="color:rgba(15,23,42,.72); font-size:13px; margin-bottom:10px;">
            Rekomendasi: coba kategori <strong>${optText}</strong> (agar lebih mendekati maksud Anda).
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button type="button" id="btnUseSuggestion"
              style="padding:10px 12px; border-radius:12px; border:1px solid rgba(13,110,253,.25); background:rgba(13,110,253,.10); font-weight:800;">
              Pakai rekomendasi
            </button>
            <button type="button" id="btnShowAll"
              style="padding:10px 12px; border-radius:12px; border:1px solid rgba(15,23,42,.12); background:transparent; font-weight:800;">
              Lihat semua sektor
            </button>
            <div style="color:rgba(15,23,42,.55); font-size:12px; align-self:center;">
              Filter saat ini: ${catLabel}
            </div>
          </div>
        `;
        box.style.display = "block";

        // bind actions
        const btnUse = document.getElementById("btnUseSuggestion");
        const btnAll = document.getElementById("btnShowAll");

        if (btnUse) {
          btnUse.onclick = () => {
            category.value = sug;
            // biarkan search tetap ada (agar user tahu inputnya)
            apply();
          };
        }
        if (btnAll) {
          btnAll.onclick = () => {
            if (category) category.value = "";
            // agar benar-benar muncul semua, kosongkan search juga
            if (search) search.value = "";
            apply();
          };
        }
      } else {
        // Tidak ada saran kategori => arahkan ke semua sektor
        box.innerHTML = `
          <div style="font-weight:800; margin-bottom:6px;">Tidak ada hasil untuk "${q}"</div>
          <div style="color:rgba(15,23,42,.72); font-size:13px; margin-bottom:10px;">
            Coba lihat semua sektor atau reset filter, lalu pilih sektor terdekat.
          </div>
          <button type="button" id="btnShowAll2"
            style="padding:10px 12px; border-radius:12px; border:1px solid rgba(15,23,42,.12); background:transparent; font-weight:800;">
            Lihat semua sektor
          </button>
        `;
        box.style.display = "block";

        const btnAll2 = document.getElementById("btnShowAll2");
        if (btnAll2) {
          btnAll2.onclick = () => {
            if (category) category.value = "";
            if (search) search.value = "";
            apply();
          };
        }
      }
    } else {
      box.style.display = "none";
      box.innerHTML = "";
    }
  }

  if (search) search.addEventListener("input", apply);
  if (category) category.addEventListener("change", apply);

  if (reset) {
    reset.addEventListener("click", () => {
      if (search) search.value = "";
      if (category) category.value = "";
      apply();
    });
  }

  apply();
})();
