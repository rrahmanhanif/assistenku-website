/* =========================================
   GLOBAL RESET
========================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", Arial, sans-serif;
}

body {
  background: #f5f7fa;
  color: #2d2d2d;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

section {
  padding: 80px 20px;
  max-width: 1080px;
  margin: auto;
}

h1, h2 {
  font-weight: 700;
  letter-spacing: -0.5px;
}

p {
  font-size: 17px;
  opacity: 0.85;
}



/* =========================================
   NAVBAR — Modern Luxury
========================================= */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 18px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(14px);

  border-bottom: 1px solid rgba(0,0,0,0.08);
  z-index: 100;
}

.navbar ul {
  display: flex;
  gap: 30px;
}

.navbar a {
  text-decoration: none;
  font-weight: 600;
  color: #2d2d2d;
  transition: 0.25s;
}

.navbar a:hover {
  color: #0077ff;
  opacity: 1;
}

.navbar a.active {
  color: #0077ff;
}

.logo {
  height: 45px;
}


/* MOBILE MENU ICON */
#menuIcon {
  display: none;
  font-size: 32px;
  cursor: pointer;
}



/* =========================================
   MOBILE MENU — Smooth collapse
========================================= */
#mobileMenu {
  display: none;
  flex-direction: column;
  gap: 18px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  padding: 20px;
  border-top: 1px solid rgba(0,0,0,0.07);
}

#mobileMenu a {
  font-size: 17px;
  font-weight: 600;
  color: #2d2d2d;
}

#mobileMenu.show {
  display: flex;
}



/* =========================================
   HERO — Modern Minimalist
========================================= */
.hero {
  text-align: center;
  padding: 160px 20px 100px;
  background: linear-gradient(135deg, #eaf3ff, #f5faff);
}

.hero h1 {
  font-size: 42px;
  color: #0a4bad;
}

.hero p {
  max-width: 700px;
  margin: auto;
  font-size: 18px;
  opacity: 0.8;
  margin-top: 12px;
}

.btn-primary {
  background: #0077ff;
  padding: 14px 30px;
  display: inline-block;
  margin-top: 35px;
  color: white;
  border-radius: 12px;
  font-size: 17px;
  text-decoration: none;
  transition: 0.2s;
  box-shadow: 0 4px 15px rgba(0, 119, 255, 0.25);
}

.btn-primary:hover {
  background: #0066dd;
  transform: translateY(-2px);
}



/* =========================================
   CARD — Premium Shadow + Soft Corners
========================================= */
.card-grid {
  display: grid;
  gap: 28px;
  margin-top: 25px;
}

@media (min-width: 700px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  padding: 26px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0px 8px 30px rgba(0,0,0,0.08);
  transition: 0.3s;
  border: 1px solid rgba(0,0,0,0.05);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 40px rgba(0,0,0,0.12);
}

.card h3 {
  color: #0356c4;
  margin-bottom: 10px;
  font-weight: 700;
}

.card img {
  width: 100%;
  border-radius: 14px;
  margin-bottom: 14px;
}



/* =========================================
   FLOATING WA BUTTON
========================================= */
.wa-floating img {
  width: 62px;
  filter: drop-shadow(0 6px 14px rgba(0,0,0,0.25));
}

.wa-floating {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 10000;
}



/* =========================================
   FOOTER
========================================= */
footer {
  text-align: center;
  padding: 30px;
  background: #fff;
  border-top: 1px solid rgba(0,0,0,0.08);
  margin-top: 40px;
  color: #555;
}



/* =========================================
   PASSWORD LOCK BUTTON — Premium Style
========================================= */
.lock-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  padding: 15px 24px;
  font-size: 16px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: 0.25s;
  z-index: 9999;
  font-weight: 600;
}

.locked {
  background: #ff4d4f;
  color: white;
  box-shadow: 0 6px 16px rgba(255,77,79,0.4);
}

.unlocked {
  background: #4caf50;
  color: white;
  box-shadow: 0 6px 16px rgba(76,175,80,0.4);
}



/* =========================================
   PASSWORD POPUP — Glassmorphism
========================================= */
#popupOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  z-index: 99999;
}

.popup-box {
  width: 90%;
  max-width: 360px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}

.popup-box input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 16px;
}



/* =========================================
   RESPONSIVE TUNING
========================================= */
@media (max-width: 768px) {
  #menuIcon {
    display: block;
  }
  nav ul {
    display: none;
  }
  .hero h1 {
    font-size: 30px;
  }
  section {
    padding: 60px 18px;
  }
}
