(function () {
  const search = document.getElementById("sectorSearch");
  const grid = document.getElementById("sectorGrid");
  const summary = document.getElementById("filterSummary"); // optional
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".sector-card"));
  const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

  // TAGS PER SEKTOR (fallback semantic ringan)
  // Anda bisa tambah kata-kata sesuai kebutuhan.
  const TAGS = {
    S01: ["pertanian","perikanan","kehutan","pangan","sayur","buah","ternak","bibit","panen","agro","farm"],
    S02: ["pertambangan","mining","tambang","galian","batubara","nikel","mineral","eksplorasi","drilling","kontraktor tambang"],
    S03: ["industri","pabrik","manufaktur","produksi","olahan","makanan olahan","garment","mesin"],
    S04: ["listrik","gas","energi","pln","instalasi listrik","panel","genset","pipa gas","utility"],
    S05: ["air","limbah","sanitasi","waste","daur ulang","pengolahan limbah","ipal","kebersihan lingkungan"],
    S06: ["konstruksi","bangunan","renovasi","kontraktor","arsitek","sipil","interior","proyek","tukang"],
    S07: ["perdagangan","toko","retail","grosir","jual beli","sparepart","reparasi","servis","bengkel","market"],
    S08: ["transportasi","logistik","kurir","ekspedisi","cargo","armada","gudang","warehouse","pergudangan","pengiriman"],
    S09: ["akomodasi","hotel","homestay","kuliner","makan","minum","resto","cafe","katering","catering","f&b"],
    S10: ["informasi","komunikasi","it","digital","software","aplikasi","website","startup","internet","konten","media"],
    S11: ["keuangan","asuransi","finance","bank","pembayaran","payment","kredit","pinjaman","agen asuransi","investasi"],
    S12: ["real estat","real estate","properti","rumah","apartemen","kavling","sewa","kontrakan","listing"],
    S13: ["jasa perusahaan","konsultan","consulting","b2b","outsourcing","vendor","legal","hukum","kontrak","hr","rekrut","audit","compliance","perizinan","notaris"],
    S14: ["pemerintahan","instansi","dinas","pemda","kementerian","kelembagaan","publik","regulasi","layanan publik"],
    S15: ["pendidikan","kursus","bimbel","les","pelatihan","training","sekolah","akademi"],
    S16: ["kesehatan","klinik","dokter","rumah sakit","rs","apotik","farmasi","medical","perawatan","care","regulasi"],
    S17: ["jasa lainnya","jasa","service","layanan","hukum","legal","event","laundry","salon","kebersihan","security","asisten","tenaga kerja"]
  };

  // Buat box rekomendasi (tidak perlu edit HTML)
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
    if (grid.parentElement) grid.parentElement.insertBefore(recoBox, grid);
    return recoBox;
  }

  function scoreSector(q, code) {
    const qq = norm(q);
    if (!qq) return 0;

    const tags = TAGS[code] || [];
    let score = 0;

    // 1) cocok langsung tag mengandung query atau sebaliknya
    for (const t of tags) {
      const tt = norm(t);
      if (!tt) continue;
      if (tt.includes(qq) || qq.includes(tt)) score += 3;
    }

    // 2) bonus jika query mengandung kata kunci penting (mis. "hukum" -> S13,S17)
    // (sudah tertangani oleh tags)

    return score;
  }

  function apply() {
    const q = search ? norm(search.value) : "";
    let visibleCount = 0;

    // Normal filter: berdasarkan title/kode/text
    cards.forEach((card) => {
      const title = norm(card.getAttribute("data-title"));
      const code = (card.getAttribute("data-sector") || "").trim(); // Sxx
      const text = norm(card.innerText);

      const ok = !q || title.includes(q) || code.toLowerCase().includes(q) || text.includes(q);
      card.style.display = ok ? "" : "none";
      if (ok) visibleCount++;
    });

    // Summary (optional)
    if (summary) {
      summary.textContent = q
        ? `${visibleCount} sektor ditampilkan • Cari: "${q}"`
        : `${cards.length} sektor ditampilkan • Semua sektor`;
    }

    const box = ensureRecoBox();

    // Fallback rekomendasi: kalau 0 hasil dan ada query
    if (visibleCount === 0 && q) {
      // Hitung skor semua sektor, ambil top 2
      const scored = cards.map((card) => {
        const code = (card.getAttribute("data-sector") || "").trim();
        return { card, code, score: scoreSector(q, code) };
      }).sort((a, b) => b.score - a.score);

      const best = scored.filter(x => x.score > 0).slice(0, 2);

      // Kalau tidak ada skor sama sekali, fallback tampilkan S17 (paling umum) + S13 (paling fleksibel)
      const fallbackCodes = ["S17", "S13"];
      const finalPicks = best.length
        ? best
        : scored.filter(x => fallbackCodes.includes(x.code)).slice(0, 2);

      // Sembunyikan semua dulu
      cards.forEach(c => c.style.display = "none");

      // Tampilkan yang direkomendasikan
      finalPicks.forEach(x => x.card.style.display = "");

      box.innerHTML = `
        <div style="font-weight:800; margin-bottom:6px;">Tidak ada hasil persis untuk "${q}"</div>
        <div style="color:rgba(15,23,42,.72); font-size:13px; margin-bottom:10px;">
          Kami tampilkan sektor yang paling mendekati maksud Anda. Silakan klik salah satu.
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button type="button" id="btnShowAll"
            style="padding:10px 12px; border-radius:12px; border:1px solid rgba(15,23,42,.12); background:transparent; font-weight:800;">
            Lihat semua sektor
          </button>
        </div>
      `;
      box.style.display = "block";

      const btnAll = document.getElementById("btnShowAll");
      if (btnAll) {
        btnAll.onclick = () => {
          if (search) search.value = "";
          cards.forEach(c => c.style.display = "");
          box.style.display = "none";
          box.innerHTML = "";
          if (summary) summary.textContent = `${cards.length} sektor ditampilkan • Semua sektor`;
        };
      }

      return; // stop di sini
    }

    // Kalau ada hasil normal, sembunyikan box rekomendasi
    box.style.display = "none";
    box.innerHTML = "";
  }

  if (search) search.addEventListener("input", apply);
  apply();
})();
