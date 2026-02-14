document.addEventListener("DOMContentLoaded", () => {

const paketData = [
{day:"Hari 1",menu:"Ayam Kecap",price:"Rp25.000"},
{day:"Hari 2",menu:"Ikan Balado",price:"Rp26.000"},
{day:"Hari 3",menu:"Ayam Lengkuas",price:"Rp29.000"},
{day:"Hari 4",menu:"Semur Ayam",price:"Rp29.000"},
{day:"Hari 5",menu:"Sambal Matah",price:"Rp26.000"},
{day:"Hari 6",menu:"Rendang Ayam",price:"Rp29.000"},
{day:"Hari 7",menu:"Soto Ayam",price:"Rp26.000"}
];

const grid = document.getElementById("paketGrid");

paketData.forEach(p=>{
const div=document.createElement("div");
div.className="card";
div.innerHTML=`<h4>${p.day}</h4>
<p>${p.menu}</p>
<strong>${p.price}</strong>`;
grid.appendChild(div);
});

document.getElementById("year").textContent=new Date().getFullYear();

/* COPY */
document.getElementById("copyBtn").addEventListener("click",()=>{
let text="Paket 7 Hari Dapur Putri\n\n";
paketData.forEach(p=>text+=`${p.day} - ${p.menu} (${p.price})\n`);
navigator.clipboard.writeText(text);
});

/* MOBILE NAV SCROLL */
const links=document.querySelectorAll(".bottom-nav a");
links.forEach(link=>{
link.addEventListener("click",()=>{
const target=document.getElementById(link.dataset.target);
if(target){target.scrollIntoView({behavior:"smooth"});}
links.forEach(l=>l.classList.remove("active"));
link.classList.add("active");
});
});

});
