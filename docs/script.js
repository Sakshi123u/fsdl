// 1. DATA PERSISTENCE & AUTH STATE
let cart = JSON.parse(localStorage.getItem('apnaCartItems')) || [];
let currentUser = JSON.parse(localStorage.getItem('apnaUser')) || null;

// 2. EXPANDED PRODUCT DATA (Myntra-style Catalog)
const products = [
    // MEN - 10 Items
    { id: 1, name: "Oversized Cotton Tee", price: 799, category: "men", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600" },
    { id: 2, name: "Urban Windbreaker", price: 2499, category: "men", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600" },
    { id: 3, name: "Slim Fit Chinos", price: 1599, category: "men", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600" },
    { id: 4, name: "Classic Denim Jacket", price: 2999, category: "men", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600" },
    { id: 5, name: "Linen Summer Shirt", price: 1899, category: "men", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600" },
    { id: 6, name: "Polo Neck T-shirt", price: 999, category: "men", img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600" },
    { id: 7, name: "Camo Cargo Pants", price: 2199, category: "men", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600" },
    { id: 8, name: "Oxford Button Down", price: 1499, category: "men", img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=600" },
    { id: 9, name: "Varsity Jacket", price: 3499, category: "men", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
    { id: 10, name: "Hooded Sweatshirt", price: 1999, category: "men", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600" },

    // WOMEN - 10 Items
    { id: 11, name: "Luxury Silk Dress", price: 4500, category: "women", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600" },
    { id: 12, name: "Summer Floral Top", price: 1299, category: "women", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" },
    { id: 13, name: "High-Waist Trousers", price: 1999, category: "women", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600" },
    { id: 14, name: "Evening Wrap Gown", price: 5999, category: "women", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
    { id: 15, name: "Satin Pleated Skirt", price: 1499, category: "women", img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600" },
    { id: 16, name: "Boho Blouse", price: 1199, category: "women", img: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600" },
    { id: 17, name: "Casual Jumpsuit", price: 2299, category: "women", img: "https://images.unsplash.com/photo-1584273143981-43c2910f3b15?w=600" },
    { id: 18, name: "Activewear Set", price: 1999, category: "women", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600" },
    { id: 19, name: "Knitted Turtleneck", price: 1599, category: "women", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600" },
    { id: 20, name: "Denim Dungarees", price: 2599, category: "women", img: "https://images.unsplash.com/photo-1582533075166-7ec97e937d3e?w=600" },

    // ACCESSORIES - 5 Items
    { id: 21, name: "Leather Watch", price: 2500, category: "accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
    { id: 22, name: "Minimalist Backpack", price: 1899, category: "accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
    { id: 23, name: "Classic Sunglasses", price: 999, category: "accessories", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600" },
    { id: 24, name: "Silver Cuff Bracelet", price: 1200, category: "accessories", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600" },
    { id: 25, name: "Premium Wallet", price: 899, category: "accessories", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600" }
];

// 3. INITIALIZATION
window.onload = function() {
    updateCartUI(); 
    updateAuthUI();
    
    // Sidebar Toggle Logic
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');

    if (cartBtn) {
        cartBtn.onclick = () => {
            sidebar.classList.add('open');
            overlay.classList.add('show');
        }
    }

    if (closeCart) closeCart.onclick = hideSidebar;
    if (overlay) overlay.onclick = hideSidebar;

    function hideSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }

    // Load Containers
    const homeContainer = document.getElementById('product-container');
    if (homeContainer) {
        // Show a mix of 8 trending items on home
        renderProducts(homeContainer, products.slice(0, 8));
    }

    const shopContainer = document.getElementById('shop-container');
    if (shopContainer) handleShopFiltering(shopContainer);
};

// 4. FILTERING LOGIC
function handleShopFiltering(container) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    const filtered = categoryFilter ? products.filter(p => p.category === categoryFilter) : products;

    const titleElement = document.getElementById('category-title');
    if (titleElement) {
        titleElement.innerText = categoryFilter ? `${categoryFilter.toUpperCase()} COLLECTION` : "ALL PRODUCTS";
    }
    renderProducts(container, filtered);
}

// 5. RENDERING FUNCTION (Now using ₹ and Myntra Layout)
function renderProducts(container, productList) {
    container.innerHTML = productList.map(p => `
        <div class="col-lg-3 col-md-4 col-6 mb-4">
            <div class="product-card h-100 bg-white border-0 shadow-sm">
                <div class="img-wrapper position-relative overflow-hidden">
                    <img src="${p.img}" class="w-100" style="aspect-ratio: 3/4; object-fit:cover;" alt="${p.name}">
                    <div class="product-badge">₹${p.price}</div>
                </div>
                <div class="p-3">
                    <h6 class="fw-bold text-uppercase mb-1" style="font-size: 0.85rem; height: 2.5em; overflow: hidden;">${p.name}</h6>
                    <p class="text-danger fw-bold mb-3">₹${p.price}</p>
                    <button class="btn btn-dark btn-sm rounded-0 w-100" onclick="addToCart(${p.id})">ADD TO BAG</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 6. CART ACTIONS
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('apnaCartItems', JSON.stringify(cart));
        updateCartUI();
        showPopup();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('apnaCartItems', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    
    if(cartCountElement) cartCountElement.innerText = cart.length;

    if (cartList) {
        if (cart.length === 0) {
            cartList.innerHTML = '<div class="text-center mt-5 text-muted">Your bag is empty</div>';
            if (cartTotal) cartTotal.innerText = "₹0";
        } else {
            let total = 0;
            cartList.innerHTML = cart.map((item, index) => {
                total += item.price;
                return `
                    <div class="d-flex align-items-center mb-3 border-bottom pb-3">
                        <img src="${item.img}" style="width: 60px; height: 80px; object-fit: cover;" class="me-3 rounded">
                        <div class="flex-grow-1">
                            <h6 class="mb-0 small fw-bold">${item.name}</h6>
                            <small class="text-danger fw-bold">₹${item.price}</small><br>
                            <button class="btn btn-sm p-0 text-muted" style="font-size: 10px;" onclick="removeFromCart(${index})">REMOVE</button>
                        </div>
                    </div>
                `;
            }).join('');
            if (cartTotal) cartTotal.innerText = `₹${total}`;
        }
    }
}

// 7. USER AUTHENTICATION LOGIC
function handleLogin(email, password) {
    if (email && password.length >= 6) {
        const user = { name: email.split('@')[0].toUpperCase(), email: email };
        localStorage.setItem('apnaUser', JSON.stringify(user));
        currentUser = user;
        location.reload(); // Refresh to update navbar
    } else {
        alert("Please enter a valid email and 6-digit password.");
    }
}

function updateAuthUI() {
    const loginLink = document.getElementById('login-link');
    if (currentUser && loginLink) {
        loginLink.innerHTML = `<i class="fa fa-user me-1"></i> ${currentUser.name}`;
        loginLink.classList.add('text-danger');
        loginLink.removeAttribute('data-bs-target'); // Prevent modal opening if logged in
    }
}

function showPopup() {
    const popup = document.createElement('div');
    popup.className = 'cart-popup';
    popup.innerHTML = `<i class="fas fa-check-circle me-2"></i><span>Added to Bag!</span>`;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 2500);
}