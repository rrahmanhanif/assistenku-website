document.addEventListener("DOMContentLoaded", () => {

const paketData = [
{day:"Hari 1",menu:"Ayam Kecap",price:"Rp25.000"},
{day:"Hari 2",menu:"Ikan Balado",price:"Rp26.000"},
{day:"Hari 3",menu:"Ayam Lengkuas",price:"Rp29.000"},
{day:"Hari 4",menu:"Semur Ayam",price:"Rp29.000"},
{day:"Hari 5",menu:"Ayam Sambal Matah",price:"Rp26.000"},
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

/* MOBILE NAV */
const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".bottom-nav a");

navLinks.forEach(link=>{
link.addEventListener("click",()=>{
const target=document.getElementById(link.dataset.target);
if(target){target.scrollIntoView({behavior:"smooth"});}
});
});

window.addEventListener("scroll",()=>{
let current="";
sections.forEach(section=>{
const sectionTop=section.offsetTop;
if(pageYOffset>=sectionTop-200){
current=section.getAttribute("id");
}
});

navLinks.forEach(link=>{
link.classList.remove("active");
if(link.dataset.target===current){
link.classList.add("active");
}
});
});

});
