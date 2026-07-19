let cart = JSON.parse(localStorage.getItem("cart")) || [];

const plungers = [

    {
        name: "The Clogfather",
        badge:"🔥 BEST SELLER",
        price: "$49.99",
        rating: "⭐⭐⭐⭐⭐",
        rarity: "Legendary",
        description: "An offer your clog can't refuse.",
        stock: "Selling Fast!",
        image: "images/Clogfather.png"
    },

    {
        name: "Plungezilla",
        badge:"🏆 CUSTOMER FAVORITE",
        price: "$89.99",
        rating: "⭐⭐⭐⭐⭐",
        rarity: "Mythic",
        description: "For clogs that have become self-aware.",
        stock: "Selling Fast!",
        image: "images/Plungerzilla.png"
    },

    {
        name: "The Bunginator",
        badge:"🔥 BEST SELLER",
        price: "$69.99",
        rating: "⭐⭐⭐⭐⭐",
        rarity: "Epic",
        description: "Say goodbye to your clogs can unclog anything.",
        stock: "In Stock",
        image: "images/Bunginator.png"
    },

 {
    name: "Royal Flush",
    badge:"💎 STAFF PICK",
    price: "$149.99",
    rating: "⭐⭐⭐⭐⭐",
    rarity: "Luxury",
    description: "Because even kings need plungers.",
    stock: "In Stock",
    image: "images/RoyalFlush.png"
},

{
    name: "Nuclear Option",
    badge:"☢️ EXTREMELY DANGEROUS",
    price: "$999.99",
    rating: "☢️",
    rarity: "Forbidden",
    description: "Use only when all hope is lost.",
    stock: "Military Use Only",
    image: "images/NuclearOption.png"
},

{
    name: "The Toilet Negotiator",
    badge:"👑 LIMITED EDITION",
    price: "$59.99",
    rating: "⭐⭐⭐⭐",
    rarity: "Rare",
    description: "Makes your clog an offer it can't refuse.",
    stock: "Top Seller",
    image: "images/Toilet negotiator.png"
},

{
    name: "Excaliplunger",
    badge:"🆕 NEW",
    price: "$199.99",
    rating: "⭐⭐⭐⭐⭐",
    rarity: "Legendary",
    description: "The chosen one may pull it from the toilet.",
    stock: "Only 3 Left!",
    image: "images/PluneExcali.png"
},

{
    name: "Plunger Prime",
    badge:"🆕 NEW",
    price: "$79.99",
    rating: "⭐⭐⭐⭐⭐",
    rarity: "Epic",
    description: "Autobots, unclog!",
    stock: "In Stock",
    image: "images/PlungerPrime.png"
}

];
const grid = document.querySelector(".products-grid");

function renderProducts(products){

    grid.innerHTML = "";

    products.forEach(plunger => {

        grid.innerHTML += `
            <div class="product-card">
                <div class="badge">${plunger.badge}</div>

                <img
                  src="${plunger.image}"
                  onclick="openImage('${plunger.image}'); nuclearSecret('${plunger.name}')"
                    alt="${plunger.name}"
                    class="product-image"
                    onclick="openImage('${plunger.image}')">

                <h2>${plunger.name}</h2>

                <p>${plunger.description}</p>

                <h3>${plunger.price}</h3>

                <p class="stock">${plunger.stock}</p>

                <p>${plunger.rating}</p>

                <span class="${plunger.rarity.toLowerCase()}">
                    ${plunger.rarity}
                </span>

                <br><br>

                <button onclick="addToWishlist('${plunger.name}')" class="wishlist-btn">
                    ❤️ Wishlist
                </button>

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

if(grid){
    renderProducts(plungers);
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



const sortSelect = document.getElementById("sortSelect");

if(sortSelect){

    sortSelect.addEventListener("change", function(){

        let sorted = [...plungers];

        switch(this.value){

            case "low-high":

                sorted.sort((a,b)=>
                    parseFloat(a.price.slice(1))-
                    parseFloat(b.price.slice(1))
                );

                break;

            case "high-low":

                sorted.sort((a,b)=>
                    parseFloat(b.price.slice(1))-
                    parseFloat(a.price.slice(1))
                );

                break;

            case "az":

                sorted.sort((a,b)=>
                    a.name.localeCompare(b.name)
                );

                break;

            case "za":

                sorted.sort((a,b)=>
                    b.name.localeCompare(a.name)
                );

                break;

        }

        renderProducts(sorted);

    });

}



function addToCart(productName) {

    const product = plungers.find(p => p.name === productName);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

   showToast(`${productName} added to cart! 🪠`);
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
    <img src="${product.image}" class="wishlist-image">

    <div class="wishlist-info">

        <div class="badge">${product.badge}</div>

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <h3>${product.price}</h3>

        <p>${product.rating}</p>

        <span class="${product.rarity.toLowerCase()}">
            ${product.rarity}
        </span>

        <br><br>

        <button onclick="addToCart('${product.name}')">
            🛒 Add to Cart
        </button>

        <button onclick="removeWishlistItem(${index})">
            ❌ Remove
        </button>

    </div>
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

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {

    showToast("🛒 Your cart is empty! Add a plunger before checking out.");

    return;

}
        const name = checkoutForm.querySelector('input[type="text"]').value;

        showToast(`🎉 Thank you for your purchase, ${name}!`);
         confetti({
    particleCount: 100,
    angle: 60,
    spread: 70,
    origin: { x: 0 }
});

confetti({
    particleCount: 100,
    angle: 120,
    spread: 70,
    origin: { x: 1 }
});
        localStorage.removeItem("cart");

        setTimeout(() => {

            window.location.href = "index.html";

        }, 2500);

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





function clearCart() {

    if(confirm("Are you sure you want to clear your cart?")){

        localStorage.removeItem("cart");

        location.reload();

    }

}

function clearCart() {

    if (confirm("Are you sure you want to clear your cart?")) {

        localStorage.removeItem("cart");

        location.reload();

    }

}


function showToast(message){

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    },3000);

}






function openImage(imageSrc){

    document.getElementById("modalImage").src = imageSrc;

    document.getElementById("imageModal").style.display = "flex";

}

function closeImage(){

    document.getElementById("imageModal").style.display = "none";

}







function addToWishlist(productName){

    const product = plungers.find(p => p.name === productName);

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if(wishlist.some(item => item.name === product.name)){

        showToast("❤️ Already in wishlist!");

        return;

    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showToast(`${product.name} added to wishlist ❤️`);

}



const wishlistItems = document.getElementById("wishlist-items");

if (wishlistItems) {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <h2>💔 Your wishlist is empty.</h2>

                <p>
                    Even The Clogfather is waiting for some love...
                </p>

                <a href="products.html" class="checkout-btn">
                    🪠 Browse Products
                </a>
            </div>
        `;

    } else {

        wishlist.forEach((product,index)=>{

    const div = document.createElement("div");

    div.className = "product-card";

    div.innerHTML = `
        <div class="badge">${product.badge}</div>

        <img
            src="${product.image}"
            alt="${product.name}"
            class="product-image"
            onclick="openImage('${product.image}')">

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <h3>${product.price}</h3>

        <p class="stock">${product.stock}</p>

        <p>${product.rating}</p>

        <span class="${product.rarity.toLowerCase()}">
            ${product.rarity}
        </span>

        <br><br>

        <button onclick="addToCart('${product.name}')">
            🛒 Add to Cart
        </button>

        <br><br>

        <button onclick="removeWishlistItem(${index})">
            ❌ Remove
        </button>
    `;

    wishlistItems.appendChild(div);

});

    }

}



function removeWishlistItem(index){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.splice(index,1);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    location.reload();

}


let nuclearClicks = 0;

function nuclearSecret(productName){

    if(productName !== "Nuclear Option") return;

    nuclearClicks++;

    if(nuclearClicks === 5){

        showToast("☢️ WARNING: You have been placed on 47 government watchlists.");

        confetti({
            particleCount:150,
            spread:100,
            colors:["#ff0000","#ffff00","#000000"]
        });

        setTimeout(()=>{
            showToast("...Just kidding. Probably.");
        },2500);

        nuclearClicks = 0;

    }

}




document.addEventListener("DOMContentLoaded", () => {

    const logo = document.querySelector(".logo-link");

    if (!logo) return;

    logo.addEventListener("click", function () {

        let logoClicks = Number(localStorage.getItem("logoClicks")) || 0;

        logoClicks++;

        localStorage.setItem("logoClicks", logoClicks);

        if (logoClicks >= 15) {

            showToast("🪠 Hello. I'm Bungi, CEO of Bungi's Plungers.");

            confetti({
                particleCount: 120,
                spread: 90
            });

            localStorage.setItem("logoClicks", 0);

        }

    });

});




