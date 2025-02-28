const content = document.getElementById('content');
const homeLink = document.getElementById('home');
const categoriesLink = document.getElementById('categories');
const cartLink = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const backButton = document.createElement("button"); // ✅ Create Back Button
backButton.innerText = "← Back";
backButton.className = "back-btn";
backButton.onclick = goBack;
document.body.insertBefore(backButton, content); // ✅ Add before content

let cart = [];

const categories = [
    'Electronics',
    'Fashion',
    'Home & Living',
    'Sports & Outdoors',
    'Beauty & Personal Care'
];

const products = {
    'Electronics': [
        { id: 'e1', name: 'Wireless Earbuds', description: 'High-quality wireless earbuds with noise cancellation.' },
        { id: 'e2', name: 'Power Bank', description: '10000mAh portable charger for your devices.' },
        { id: 'e3', name: 'Smart Watch', description: 'Track your fitness and stay connected.' },
        { id: 'e4', name: 'Bluetooth Speaker', description: 'Portable speaker with excellent sound quality.' },
        { id: 'e5', name: 'Phone Case', description: 'Durable and stylish case for your smartphone.' },
        { id: 'e6', name: 'USB Flash Drive', description: '32GB storage for your important files.' },
        { id: 'e7', name: 'Wireless Mouse', description: 'Ergonomic design for comfortable use.' },
        { id: 'e8', name: 'Laptop Stand', description: 'Adjustable stand for better posture and cooling.' },
        { id: 'e9', name: 'Webcam Cover', description: 'Protect your privacy with this sliding cover.' },
        { id: 'e10', name: 'Cable Organizer', description: 'Keep your cables tidy and organized.' }
    ],
    'Fashion': [
        { id: 'f1', name: 'T-Shirt', description: 'Comfortable cotton t-shirt in various colors.' },
        { id: 'f2', name: 'Socks Set', description: 'Pack of 3 pairs of cozy socks.' },
        { id: 'f3', name: 'Baseball Cap', description: 'Adjustable cap for sun protection.' },
        { id: 'f4', name: 'Scarf', description: 'Soft and warm scarf for chilly days.' },
        { id: 'f5', name: 'Sunglasses', description: 'UV protection sunglasses in classic style.' },
        { id: 'f6', name: 'Wrist Watch', description: 'Analog watch with leather strap.' },
        { id: 'f7', name: 'Beanie', description: 'Warm knitted beanie for winter.' },
        { id: 'f8', name: 'Gloves', description: 'Touchscreen-compatible gloves.' },
        { id: 'f9', name: 'Wallet', description: 'Slim leather wallet with multiple card slots.' },
        { id: 'f10', name: 'Belt', description: 'Classic leather belt with metal buckle.' }
    ],
    'Home & Living': [
        { id: 'h1', name: 'Throw Pillow', description: 'Decorative pillow for your couch or bed.' },
        { id: 'h2', name: 'Wall Clock', description: 'Modern design wall clock for any room.' },
        { id: 'h3', name: 'Photo Frame', description: '5x7 inch frame to display your memories.' },
        { id: 'h4', name: 'Scented Candle', description: 'Relaxing aroma candle for your home.' },
        { id: 'h5', name: 'Coaster Set', description: 'Set of 4 coasters to protect your furniture.' },
        { id: 'h6', name: 'Plant Pot', description: 'Ceramic pot for your indoor plants.' },
        { id: 'h7', name: 'Tea Towel Set', description: 'Set of 3 cotton tea towels for your kitchen.' },
        { id: 'h8', name: 'Desk Organizer', description: 'Keep your workspace tidy and organized.' },
        { id: 'h9', name: 'Shower Curtain', description: 'Waterproof curtain with modern print.' },
        { id: 'h10', name: 'Door Mat', description: 'Welcome mat for your entrance.' }
    ],
    'Sports & Outdoors': [
        { id: 's1', name: 'Water Bottle', description: 'BPA-free water bottle for your workouts.' },
        { id: 's2', name: 'Yoga Mat', description: 'Non-slip yoga mat for your practice.' },
        { id: 's3', name: 'Resistance Bands', description: 'Set of 3 resistance bands for strength training.' },
        { id: 's4', name: 'Jump Rope', description: 'Adjustable jump rope for cardio workouts.' },
        { id: 's5', name: 'Sports Towel', description: 'Quick-dry microfiber towel for gym or outdoor activities.' },
        { id: 's6', name: 'Arm Band', description: 'Phone arm band for running or cycling.' },
        { id: 's7', name: 'Camping Flashlight', description: 'LED flashlight for outdoor adventures.' },
        { id: 's8', name: 'Frisbee', description: 'Classic frisbee for park or beach fun.' },
        { id: 's9', name: 'Fitness Gloves', description: 'Workout gloves for weightlifting.' },
        { id: 's10', name: 'Sports Socks', description: 'Moisture-wicking socks for athletic activities.' }
    ],
    'Beauty & Personal Care': [
        { id: 'b1', name: 'Face Mask', description: 'Hydrating sheet mask for glowing skin.' },
        { id: 'b2', name: 'Lip Balm', description: 'Moisturizing lip balm with SPF protection.' },
        { id: 'b3', name: 'Hand Cream', description: 'Nourishing hand cream for soft hands.' },
        { id: 'b4', name: 'Hair Brush', description: 'Detangling brush for all hair types.' },
        { id: 'b5', name: 'Nail Polish', description: 'Long-lasting nail polish in trendy colors.' },
        { id: 'b6', name: 'Makeup Sponge', description: 'Soft makeup sponge for flawless application.' },
        { id: 'b7', name: 'Facial Mist', description: 'Refreshing facial mist for hydration.' },
        { id: 'b8', name: 'Eyebrow Pencil', description: 'Waterproof eyebrow pencil for defined brows.' },
        { id: 'b9', name: 'Shower Gel', description: 'Moisturizing shower gel with natural ingredients.' },
        { id: 'b10', name: 'Compact Mirror', description: 'Portable double-sided mirror for on-the-go touch-ups.' }
    ]
};

homeLink.addEventListener('click', () => navigateTo("home"));
categoriesLink.addEventListener('click', () => navigateTo("categories"));
cartLink.addEventListener('click', () => navigateTo("cart"));

function navigateTo(page, category = null) {
    history.pushState({ page, category }, "", `#${page}${category ? `-${category}` : ""}`);
    renderPage(page, category);
}

function renderPage(page, category = null) {
    backButton.style.display = history.length > 1 ? "block" : "none"; // Show Back Button only if navigated

    if (page === "home") {
        content.innerHTML = `
            <h1>Welcome to A99</h1>
            <p>Discover amazing products, all at just ₹99!</p>
            <button onclick="navigateTo('categories')">Browse Categories</button>
        `;
    } else if (page === "categories") {
        content.innerHTML = `
            <h1>Our Categories</h1>
            <div class="category-grid">
                ${categories.map(category => `
                    <div class="category-card" onclick="navigateTo('category', '${category}')">
                        <h2>${category}</h2>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (page === "category") {
        content.innerHTML = `
            <h1>${category}</h1>
            <div class="product-grid">
                ${products[category]?.map(product => `
                    <div class="product-card">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p class="price">₹99</p>
                        <button onclick="addToCart('${product.id}', '${product.name}')">Add to Cart</button>
                    </div>
                `).join('') || "<p>No products available.</p>"}
            </div>
        `;
    } else if (page === "cart") {
        content.innerHTML = `
            <h1>Your Cart</h1>
            ${cart.length === 0 ? '<p>Your cart is empty.</p>' : `
                <ul>
                    ${cart.map(item => `
                        <li>
                            ${item.name} - ₹99
                            <button onclick="removeFromCart('${item.id}')">Remove</button>
                        </li>
                    `).join('')}
                </ul>
                <p>Total: ₹${cart.length * 99}</p>
                <button onclick="checkout()">Checkout</button>
            `}
        `;
    }
}

function goBack() {
    history.back(); 
}

// Handle Browser Back/Forward Navigation
window.onpopstate = (event) => {
    renderPage(event.state?.page || "home", event.state?.category || null);
};

// Cart Functions
function addToCart(productId, productName) {
    cart.push({ id: productId, name: productName });
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderPage("cart");
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    renderPage("cart");
}

// Load Initial Page from URL Hash
const initialPage = location.hash.split("-")[0].replace("#", "") || "home";
const initialCategory = location.hash.split("-")[1] || null;
navigateTo(initialPage, initialCategory);
