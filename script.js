const nomorWA = "6281234567890";

let products = [];
let cart = [];

async function loadProducts(){

const res = await fetch("products.json");
products = await res.json();

renderProducts();

}

function renderProducts(){

let html = "";

products.forEach((p,i)=>{

html += `
<div class="card">

<img src="${p.image}" alt="${p.name}">

<div class="card-content">

<h3>${p.name}</h3>

<div class="price">
Rp ${p.price.toLocaleString()}
</div>

<select id="variant${i}">
${p.variants.map(v=>`<option>${v}</option>`).join("")}
</select>

<button
class="buy-btn"
onclick="addCart(${i})">
Tambah Keranjang
</button>

</div>
</div>
`;

});

document.getElementById("products").innerHTML = html;

}

function addCart(index){

const product = products[index];

cart.push({
name: product.name,
price: product.price,
variant: document.getElementById(`variant${index}`).value
});

renderCart();

}

function renderCart(){

let html = "";
let total = 0;

cart.forEach((item,index)=>{

html += `
<li>
${index+1}. ${item.name}
<br>
Varian: ${item.variant}
<br>
Rp ${item.price.toLocaleString()}
</li>
`;

total += item.price;

});

document.getElementById("cartList").innerHTML = html;
document.getElementById("total").innerText =
total.toLocaleString();

}

function checkoutWA(){

if(cart.length === 0){
alert("Keranjang masih kosong");
return;
}

let total = 0;

let invoice =
`🧾 *INVOICE DIGITAL STORE*%0A`;
invoice += `━━━━━━━━━━━━━━%0A`;

cart.forEach((item,index)=>{

invoice += `${index+1}. ${item.name}%0A`;
invoice += `Varian : ${item.variant}%0A`;
invoice += `Harga : Rp ${item.price.toLocaleString()}%0A%0A`;

total += item.price;

});

invoice += `━━━━━━━━━━━━━━%0A`;
invoice += `💰 TOTAL : Rp ${total.toLocaleString()}%0A`;
invoice += `━━━━━━━━━━━━━━%0A`;
invoice += `Terima kasih telah berbelanja 🙏`;

window.open(
`https://wa.me/${nomorWA}?text=${invoice}`,
"_blank"
);

}

function kirimFeedback(){

let nama =
document.getElementById("nama").value;

let pesan =
document.getElementById("pesan").value;

if(!nama || !pesan) return;

let data =
JSON.parse(
localStorage.getItem("feedback")
) || [];

data.unshift({
nama,
pesan
});

localStorage.setItem(
"feedback",
JSON.stringify(data)
);

document.getElementById("nama").value = "";
document.getElementById("pesan").value = "";

loadFeedback();

}

function loadFeedback(){

let data =
JSON.parse(
localStorage.getItem("feedback")
) || [];

let html = "";

data.forEach(item=>{

html += `
<div class="comment">
<b>${item.nama}</b><br>
${item.pesan}
</div>
`;

});

document.getElementById("feedbackList").innerHTML =
html;

}

loadProducts();
loadFeedback();
