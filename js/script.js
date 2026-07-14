let cart = JSON.parse(localStorage.getItem("cart")) || [];

const plungers = [

    {
        name: "The Clogfather",
        badge:"🔥 BEST SELLER",
        price: "$49.99",
        rating: "⭐⭐⭐⭐⭐",
        rarity: "Legendary",
        description: "An offer your clog can't refuse.",
        stock: "Selling Fast!"
    },

    {
        name: "Plungezilla",
        badge:"🏆 CUSTOMER FAVORITE",
        price: "$89.99",
        rating: "⭐⭐⭐⭐⭐",
        rarity: "Mythic",
        description: "For clogs that have become self-aware.",
        stock: "Selling Fast!"
    },

    {
        name: "The Bunginator",
        badge:"🔥 BEST SELLER",
        price: "$69.99",
        rating: "⭐⭐⭐⭐⭐",
        rarity: "Epic",
        description: "Say goodbye to your clogs can unclog anything.",
        stock: "In Stock"
    },

 {
    name: "Royal Flush",
    badge:"💎 STAFF PICK",
    price: "$149.99",
    rating: "⭐⭐⭐⭐⭐",
    rarity: "Luxury",
    description: "Because even kings need plungers.",
    stock: "In Stock"
},

{
    name: "Nuclear Option",
    badge:"☢️ EXTREMELY DANGEROUS",
    price: "$999.99",
    rating: "☢️",
    rarity: "Forbidden",
    description: "Use only when all hope is lost.",
    stock: "Military Use Only"
},

{
    name: "The Toilet Negotiator",
    badge:"👑 LIMITED EDITION",
    price: "$59.99",
    rating: "⭐⭐⭐⭐",
    rarity: "Rare",
    description: "Makes your clog an offer it can't refuse.",
    stock: "Top Seller"
},

{
    name: "Excaliplunger",
    badge:"🆕 NEW",
    price: "$199.99",
    rating: "⭐⭐⭐⭐⭐",
    rarity: "Legendary",
    description: "The chosen one may pull it from the toilet.",
    stock: "Only 3 Left!"
},

{
    name: "Plunger Prime",
    badge:"🆕 NEW",
    price: "$79.99",
    rating: "⭐⭐⭐⭐⭐",
    rarity: "Epic",
    description: "Autobots, unclog!",
    stock: "In Stock"
}

];
const grid = document.querySelector(".products-grid");

if(grid){

    plungers.forEach(plunger => {

        grid.innerHTML += `
            <div class="product-card">
            <div class="badge">${plunger.badge}</div>

            <img
    src="https://placehold.co/300x300/b30000/ffffff?text=🪠"
    alt="${plunger.name}"
    class="product-image">

                <h2>${plunger.name}</h2>

                <p>${plunger.description}</p>

                <h3>${plunger.price}</h3>

 <p class="stock">${plunger.stock}</p>

 <p>${plunger.rating}</p>

                <span class="${plunger.rarity.toLowerCase()}">
    ${plunger.rarity}
</span>

                <br><br>

                <button onclick="viewProduct('${plunger.name}')">
    View Details
</button>

<br><br>

<button onclick="addToCart('${plunger.name}')">
    Add to Cart
</button>
            </div>
        `;

    });

}

const searchBar = document.querySelector("#searchBar");

if (searchBar) {

    searchBar.addEventListener("input", () => {

        const search = searchBar.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const title = card.querySelector("h2").textContent.toLowerCase();

            if (title.includes(search)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}

function addToCart(productName) {

    const product = plungers.find(p => p.name === productName);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    alert(`${productName} added to cart! 🪠`);
}


function viewProduct(productName){

    const product = plungers.find(p => p.name === productName);

    document.getElementById("modalTitle").textContent = product.name;
    document.getElementById("modalDescription").textContent = product.description;
    document.getElementById("modalPrice").textContent = "Price: " + product.price;
    document.getElementById("modalStock").textContent = "Stock: " + product.stock;
    document.getElementById("modalRarity").textContent = "Rarity: " + product.rarity;

    document.getElementById("productModal").style.display = "flex";

}

function closeModal(){

    document.getElementById("productModal").style.display = "none";

}


cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("Cart:", cart);
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

if (cartItems) {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        console.log(product);

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>

            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

        total += Number(product.price.replace("$", ""));

    });

    totalPrice.textContent = total.toFixed(2);

}


function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

const checkoutForm = document.getElementById("checkoutForm");

if(checkoutForm){

    checkoutForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert("🎉 Thank you for choosing Bungi's Plungers!\n\nYour order has been received and our elite plunger logistics team is preparing it for shipment.");

        localStorage.removeItem("cart");

        window.location.href = "index.html";

    });

}


const disclaimerModal = document.getElementById("disclaimerModal");

if (disclaimerModal && !localStorage.getItem("acceptedDisclaimer")) {

    const agreeBox = document.getElementById("agreeBox");
    const continueBtn = document.getElementById("continueBtn");

    disclaimerModal.style.display = "flex";

    agreeBox.addEventListener("change", () => {
        continueBtn.disabled = !agreeBox.checked;
    });

    continueBtn.addEventListener("click", () => {

        localStorage.setItem("acceptedDisclaimer", "true");

        disclaimerModal.style.display = "none";

    });

}





