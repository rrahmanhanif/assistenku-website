/* =========================================
GLOBAL RESET
========================================= */

{
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: "Inter", Arial, sans-serif;
}


body {
background: #f7f9fc;
color: #222;
line-height: 1.7;
}

/* =========================================
NAVBAR
========================================= */
header {
position: fixed;
top: 0;
left: 0;
width: 100%;
background: #ffffffee;
backdrop-filter: blur(8px);
border-bottom: 1px solid #e0e0e0;
z-index: 999;
}

.navbar {
max-width: 1200px;
margin: auto;
padding: 15px 20px;
display: flex;
align-items: center;
justify-content: space-between;
}

.logo {
width: 110px;
object-fit: contain;
}

nav ul {
display: flex;
gap: 30px;
}

nav ul li {
list-style: none;
}

nav ul li a {
text-decoration: none;
color: #1a1a1a;
font-weight: 500;
transition: 0.2s;
}

nav ul li a:hover,
nav ul li a.active {
color: #0d6efd;
}

/* HAMBURGER */
#menuIcon {
display: none;
cursor: pointer;
font-size: 30px;
}

#mobileMenu {
display: none;
flex-direction: column;
background: white;
width: 100%;
padding: 20px;
border-bottom: 1px solid #e0e0e0;
}

#mobileMenu a {
text-decoration: none;
color: #333;
padding: 10px 0;
font-weight: 500;
}

/* =========================================
HERO SECTION (INDEX)
========================================= */
.hero {
max-width: 900px;
margin: 140px auto 40px auto;
padding: 20px;
text-align: center;
}

.hero h1 {
font-size: 32px;
margin-bottom: 20px;
color: #0d6efd;
}

.hero p {
font-size: 17px;
color: #333;
margin-bottom: 25px;
}

/* =========================================
SECTIONS
========================================= */

section {
max-width: 1100px;
margin: auto;
padding: 35px 20px;
}

section h2 {
font-size: 26px;
margin-bottom: 12px;
color: #0d6efd;
}

section p {
font-size: 16px;
color: #333;
margin-bottom: 15px;
}

/* =========================================
CARD GRID
========================================= */

.card-grid {
display: grid;
gap: 20px;
padding-top: 10px;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card {
background: white;
padding: 22px;
border-radius: 14px;
box-shadow: 0px 4px 12px #00000011;
transition: 0.2s;
}

.card:hover {
transform: translateY(-4px);
box-shadow: 0px 6px 18px #00000022;
}

.card h3 {
font-size: 20px;
margin-bottom: 8px;
color: #333;
}

.card p {
margin-bottom: 10px;
color: #444;
}

/* List inside card */
.card ul {
margin-left: 18px;
padding-bottom: 10px;
}

.card ul li {
margin-bottom: 5px;
color: #333;
}

/* Founder images, legal images */
.founder-img,
.legal-img {
width: 100%;
border-radius: 12px;
margin: 10px 0;
object-fit: cover;
}

/* =========================================
BUTTONS
========================================= */
.btn-primary {
display: inline-block;
padding: 12px 20px;
background: #0d6efd;
color: white;
border-radius: 12px;
text-decoration: none;
font-weight: 600;
transition: 0.2s;
}

.btn-primary:hover {
background: #0b5ed7;
}

/* LOCK BUTTON */
.lock-button {
padding: 12px 20px;
border: 0;
border-radius: 12px;
cursor: pointer;
font-weight: bold;
font-size: 16px;
transition: 0.2s;
}

.locked {
background: #d9534f;
color: white;
}

.unlocked {
background: #28a745;
color: white;
}

/* =========================================
FOOTER
========================================= */
footer {
margin-top: 40px;
background: #f0f3f8;
text-align: center;
padding: 20px;
font-size: 14px;
}

/* =========================================
RESPONSIVE
========================================= */

@media (max-width: 860px) {
nav ul {
display: none;
}

#menuIcon {
display: block;
}

#mobileMenu.active {
display: flex;
}
}
