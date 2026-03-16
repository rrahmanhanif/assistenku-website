let map = L.map('map').setView([-6.2,106.8],11)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map)

let pickup=null
let drop=null
let jarakKm=0

map.on("click",function(e){

if(!pickup){

pickup = L.marker(e.latlng).addTo(map)

}

else if(!drop){

drop = L.marker(e.latlng).addTo(map)

let distance = map.distance(
pickup.getLatLng(),
drop.getLatLng()
)

jarakKm = distance/1000

let tarif = Math.round(jarakKm*10000)

document.getElementById("tarif").innerText = tarif

}

})

async function submitBooking(){

let data = {

nama:document.getElementById("nama").value,
wa:document.getElementById("wa").value,
layanan:document.getElementById("layanan").value,
durasi:document.getElementById("durasi").value,
jarak:jarakKm

}

let res = await fetch(
"https://api.assistenku.com/pesanmobil",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

let json = await res.json()

let pesan = `Booking Mobil Premium

Kode Booking: ${json.kode_booking}

Nama: ${data.nama}

Estimasi Tarif:
Rp${json.tarif}

`

let url = "https://wa.me/6285186660021?text="
+encodeURIComponent(pesan)

window.open(url)

}
