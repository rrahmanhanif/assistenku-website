// ========================================================
// SAFE QUERY SELECTOR
// ========================================================
function $(selector) {
  return document.querySelector(selector);
}

// ========================================================
// MOBILE NAVIGATION (HAMBURGER OPEN/CLOSE)
// ========================================================
const hamburger = $(".hamburger");
const mobileNav = $(".mobile-nav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
    hamburger.classList.toggle("active");
  });
}

// ========================================================
// ISLAND BUTTON LINKS
// ========================================================
const islandButtons = document.querySelectorAll(".island-btn");

if (islandButtons) {
  islandButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.getAttribute("data-link");
      if (link) window.location.href = link;
    });
  });
}

// ========================================================
// LOCK / UNLOCK SYSTEM
// ========================================================
const lockBtn = $("#lock-btn");
const unlockBtn = $("#unlock-btn");
const lockScreen = $(".locked");

function lockSite() {
  if (lockScreen) lockScreen.classList.add("active");
}

function unlockSite() {
  if (lockScreen) lockScreen.classList.remove("active");
}

if (lockBtn) lockBtn.addEventListener("click", lockSite);
if (unlockBtn) unlockBtn.addEventListener("click", unlockSite);

// ========================================================
// END OF SCRIPT
// ========================================================
