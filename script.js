/* ===========================
   MOBILE NAVIGATION
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
  }
});


/* ===========================
   LOCK / UNLOCK SYSTEM
=========================== */

const lockedPages = ["layanan.html", "karir.html"];
const currentPage = window.location.pathname.split("/").pop();

if (lockedPages.includes(currentPage)) {
  addLockButton();
}

function addLockButton() {
  const btn = document.createElement("button");
  btn.id = "lockBtn";
  btn.className = "lock-button locked";
  btn.innerHTML = "🔒 Akses Terkunci";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => showPasswordPopup());
}


/* ===========================
   POPUP PASSWORD
=========================== */

function showPasswordPopup() {
  const existing = document.getElementById("popupOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "popupOverlay";

  overlay.innerHTML = `
    <div class="popup-box">
      <h3>Masukkan Password</h3>
      <p>Halaman ini dilindungi. Masukkan password untuk membuka akses.</p>

      <input type="password" id="userPassword" placeholder="Password">

      <div class="popup-actions">
        <button id="cancelPopup">Batal</button>
        <button id="confirmPass">Buka</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("cancelPopup").onclick = () => overlay.remove();
  document.getElementById("confirmPass").onclick = validatePassword;
}


/* ===========================
   MD5 SAFETY (Offline, tanpa HTTPS)
=========================== */

// MD5 manual (tanpa crypto.subtle)
function md5(str) {
  function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX, lY) {
    let lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);

    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    }
    return lResult ^ lX8 ^ lY8;
  }

  function F(x, y, z) { return (x & y) | (~x & z); }
  function G(x, y, z) { return (x & z) | (y & ~z); }
  function H(x, y, z) { return x ^ y ^ z; }
  function I(x, y, z) { return y ^ (x | ~z); }

  function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str) {
    let lWordCount;
    const lMessageLength = str.length;
    const lNumberOfWordsTemp1 = lMessageLength + 8;
    const lNumberOfWordsTemp2 =
      (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64 + 1;
    const lNumberOfWords = lNumberOfWordsTemp2 * 16;
    const wordArray = new Array(lNumberOfWords - 1);
    let bytePosition = 0;
    let byteCount = 0;

    while (byteCount < lMessageLength) {
      lWordCount = (byteCount - (byteCount % 4)) / 4;
      bytePosition = (byteCount % 4) * 8;
      wordArray[lWordCount] =
        (wordArray[lWordCount] | (str.charCodeAt(byteCount) << bytePosition)) >>> 0;
      byteCount++;
    }

    lWordCount = (byteCount - (byteCount % 4)) / 4;
    bytePosition = (byteCount % 4) * 8;
    wordArray[lWordCount] =
      (wordArray[lWordCount] | (0x80 << bytePosition)) >>> 0;

    wordArray[lNumberOfWords - 2] = (lMessageLength << 3) >>> 0;
    wordArray[lNumberOfWords - 1] = (lMessageLength >>> 29) >>> 0;

    return wordArray;
  }

  function wordToHex(lValue) {
    let wordToHexValue = "";
    for (let i = 0; i <= 3; i++) {
      const byte = (lValue >>> (i * 8)) & 255;
      let hex = "0" + byte.toString(16);
      wordToHexValue += hex.slice(-2);
    }
    return wordToHexValue;
  }

  const x = convertToWordArray(str);

  let a = 0x67452301;
  let b = 0xEFCDAB89;
  let c = 0x98BADCFE;
  let d = 0x10325476;

  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;

    a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);

    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);

    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);

    a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return (
    wordToHex(a) +
    wordToHex(b) +
    wordToHex(c) +
    wordToHex(d)
  ).toLowerCase();
}

// Hash password asli (assistenku2025)
const correctHash = "b3a793bcee664f645dd5bb58d60f89c8";


/* ===========================
   VALIDASI PASSWORD
=========================== */
function validatePassword() {
  const pass = document.getElementById("userPassword").value.trim();
  const overlay = document.getElementById("popupOverlay");

  if (md5(pass) === correctHash) {
    if (overlay) overlay.remove();
    unlockSuccess();
  } else {
    alert("Password salah.");
  }
}


/* ===========================
   UNLOCK SUCCESS
=========================== */
function unlockSuccess() {
  const btn = document.getElementById("lockBtn");

  btn.classList.remove("locked");
  btn.classList.add("unlocked");
  btn.innerHTML = "🔓 Akses Dibuka";

  if (currentPage === "layanan.html") {
    window.location.href =
      "https://drive.google.com/file/d/1Hwzol_d_aAM0OGxPR_un04nPyTUrR5gW/view";
  }

  if (currentPage === "karir.html") {
    window.location.href =
      "https://drive.google.com/file/d/1UKaP7oSB11vBh2wI1u0qBCkwVF-YHEeD/view";
  }
}


/* ===========================
   ANTI INSPECT (Versi Aman)
=========================== */

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
});
