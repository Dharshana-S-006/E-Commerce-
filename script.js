/* ==========================================================================
   ShopSizzle - Complete Updated JavaScript Dataset & Application Engine
   ========================================================================== */

// 1. Comprehensive Product Dataset (24 Products across 8 Rich Categories)
const products = [
  // --- Category: Girls Tops & Western Wear ---
  {
    id: "PROD-119",
    name: "Elegant Floral Puff-Sleeve Summer Top",
    category: "Girls Western",
    price: 27.99,
    originalPrice: 36.00,
    rating: 4.9,
    reviews: 380,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80",
    description: "Chic floral printed blouse featuring sweetheart neckline, elastic puff sleeves, and lightweight breathable chiffon fabric.",
    specs: { "Fabric": "Breathable Chiffon", "Sleeve": "Puff Half-Sleeve", "Fit": "Regular Fit", "Pattern": "Floral Print" }
  },
  {
    id: "PROD-120",
    name: "Trendy Denim Crop Jacket & Western Top",
    category: "Girls Western",
    price: 42.00,
    originalPrice: 55.00,
    rating: 4.8,
    reviews: 265,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    description: "Stylish washed blue denim cropped jacket with brass button closures and twin chest flap pockets. Perfect over dresses or tees.",
    specs: { "Material": "100% Cotton Denim", "Length": "Cropped", "Style": "Casual Western", "Closure": "Button Front" }
  },
  {
    id: "PROD-121",
    name: "Chic High-Waist Wide-Leg Trousers",
    category: "Girls Western",
    price: 38.50,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 190,
    badge: "New",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    description: "Tailored high-waisted wide leg trousers with pleated front details and side slant pockets. Elegant western silhouette.",
    specs: { "Waist": "High Rise Elasticated", "Leg": "Wide Straight Leg", "Fabric": "Poly-Viscose Blend" }
  },
  {
    id: "PROD-122",
    name: "Graceful A-Line Midi Western Dress",
    category: "Girls Western",
    price: 49.99,
    originalPrice: 68.00,
    rating: 4.9,
    reviews: 410,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
    description: "Sophisticated flared A-line midi dress with subtle waist cinch and tiered ruffle hemline. Ideal for brunch or evening outings.",
    specs: { "Length": "Midi Length", "Neckline": "V-Neck", "Closure": "Hidden Back Zipper" }
  },

  // --- Category: Men's Clothing ---
  {
    id: "PROD-123",
    name: "Men's Slim Fit Cotton Oxford Shirt",
    category: "Menswear",
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.8,
    reviews: 310,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    description: "Classic button-down Oxford casual shirt made with 100% premium breathable cotton weave and buttoned cuffs.",
    specs: { "Material": "100% Oxford Cotton", "Fit": "Slim Fit", "Collar": "Button-Down Collar" }
  },
  {
    id: "PROD-124",
    name: "Classic Heavyweight Denim Trucker Jacket",
    category: "Menswear",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 450,
    badge: "Must Have",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    description: "Rugged vintage blue denim jacket with heavy-duty metal shank buttons and adjustable waist tabs.",
    specs: { "Fabric": "Heavyweight Denim", "Pockets": "4 Pocket Design", "Fit": "Regular Fit" }
  },
  {
    id: "PROD-125",
    name: "Urban Fleece Pullover Hoodie",
    category: "Menswear",
    price: 39.99,
    originalPrice: 52.00,
    rating: 4.7,
    reviews: 280,
    badge: "Cozy",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-comfortable fleece-lined pullover hoodie with adjustable drawstring hood and spacious kangaroo pocket.",
    specs: { "Fabric": "Cotton-Poly Fleece Blend", "Pocket": "Front Kangaroo", "Care": "Machine Wash" }
  },
  {
    id: "PROD-106",
    name: "Minimalist Premium Cotton Casual T-Shirt",
    category: "Menswear",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviews: 194,
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    description: "100% organic combed cotton t-shirt with tailored unisex fit, reinforced stitch collar, and ultra-soft feel.",
    specs: { "Material": "100% Organic Cotton", "Fit": "Tailored Regular", "Neck": "Crew Neck" }
  },

  // --- Category: Watches & Jewellery ---
  {
    id: "PROD-126",
    name: "Sovereign Chronograph Analog Quartz Watch",
    category: "Watches & Jewellery",
    price: 129.00,
    originalPrice: 169.00,
    rating: 4.9,
    reviews: 520,
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    description: "Sophisticated analog wrist watch with Japanese quartz movement, stainless steel case, sapphire glass, and genuine leather strap.",
    specs: { "Movement": "Japanese Quartz Chrono", "Water Resistance": "50 Meters (5 ATM)", "Strap": "Genuine Italian Leather" }
  },
  {
    id: "PROD-102",
    name: "PulseFit Horizon Smart Watch 2",
    category: "Watches & Jewellery",
    price: 149.50,
    originalPrice: 199.00,
    rating: 4.8,
    reviews: 219,
    badge: "Popular",
    image: "images/smartwatch_1788763354607.jpg",
    description: "Advanced AMOLED smartwatch with heart rate monitoring, standalone GPS tracking, call alerts, and 7-day battery life.",
    specs: { "Display": "1.43\" AMOLED 60Hz", "Sensors": "SpO2, GPS, HR", "Battery": "7 Days" }
  },
  {
    id: "PROD-127",
    name: "18K Gold Plated Layered Pendant Necklace",
    category: "Watches & Jewellery",
    price: 28.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 340,
    badge: "Elegant",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "Delicate double-layered chain necklace featuring coin pendant and solitaire crystal. Tarnish-resistant 18K gold finish.",
    specs: { "Plating": "18K Real Gold Plated", "Chain": "Adjustable Lobster Clasp", "Hypoallergenic": "Yes" }
  },
  {
    id: "PROD-128",
    name: "Minimalist Sterling Silver Bangle Bracelet",
    category: "Watches & Jewellery",
    price: 35.00,
    originalPrice: 48.00,
    rating: 4.7,
    reviews: 210,
    badge: "Classy",
    image: "https://images.unsplash.com/photo-1611591475179-425d47f9be8b?auto=format&fit=crop&w=600&q=80",
    description: "Sleek open cuff bangle bracelet crafted from 925 sterling silver with polished smooth finish. Adjustable wrist sizing.",
    specs: { "Material": "925 Sterling Silver", "Style": "Open Cuff Bangle", "Weight": "18g" }
  },

  // --- Category: Wallets, Belts & Bags ---
  {
    id: "PROD-129",
    name: "Vintage Genuine Bifold Leather Wallet",
    category: "Wallets & Belts",
    price: 26.99,
    originalPrice: 36.00,
    rating: 4.9,
    reviews: 640,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    description: "Slim genuine cowhide leather wallet equipped with RFID blocking protection, 8 card slots, and dual currency compartments.",
    specs: { "Material": "Top-Grain Leather", "Protection": "RFID Signal Blocking", "Capacity": "8 Cards + Cash" }
  },
  {
    id: "PROD-130",
    name: "Designer Genuine Leather Dress Belt",
    category: "Wallets & Belts",
    price: 29.50,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 310,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
    description: "Reversible full-grain leather belt featuring polished alloy automatic ratchet buckle. Smooth versatile design.",
    specs: { "Material": "100% Full-Grain Leather", "Width": "3.5 cm", "Buckle": "Scratch-Resistant Zinc Alloy" }
  },
  {
    id: "PROD-104",
    name: "AeroShield Modular Tech Backpack",
    category: "Wallets & Belts",
    price: 95.00,
    originalPrice: 120.00,
    rating: 4.8,
    reviews: 180,
    badge: "Top Rated",
    image: "images/backpack_1788763557994.jpg",
    description: "Weatherproof 28L laptop backpack designed with padded 16\" MacBook sleeve and hidden anti-theft pockets.",
    specs: { "Capacity": "28 Liters", "Laptop Sleeve": "Up to 16\"", "Material": "IPX4 Nylon" }
  },
  {
    id: "PROD-109",
    name: "Elegant Italian Leather Handbag",
    category: "Wallets & Belts",
    price: 89.00,
    originalPrice: 125.00,
    rating: 4.8,
    reviews: 210,
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    description: "Handcrafted genuine leather tote bag with gold-tone hardware, spacious interior compartments, and detachable shoulder strap.",
    specs: { "Material": "100% Genuine Leather", "Dimensions": "32 x 24 x 12 cm" }
  },

  // --- Category: Girls Makeup & Beauty ---
  {
    id: "PROD-113",
    name: "Glitz & Glow Velvet Matte Lipstick Set",
    category: "Beauty",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviews: 420,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    description: "Set of 5 ultra-pigmented velvet matte lipsticks with moisturizing vitamin E, smudge-proof 16-hour long wear finish.",
    specs: { "Shades": "5 Matte Colors", "Finish": "Velvet Smooth", "Formula": "Hydrating Vitamin E", "Long-Wear": "16 Hours" }
  },
  {
    id: "PROD-114",
    name: "Rose Gold Eyeshadow & Blush Palette",
    category: "Beauty",
    price: 32.00,
    originalPrice: 42.00,
    rating: 4.8,
    reviews: 310,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    description: "Versatile 18-shade makeup palette featuring high-pigment shimmers, buttery mattes, and glowing blush compacts.",
    specs: { "Pans": "18 Shades", "Finish": "Shimmer & Matte", "Cruelty-Free": "100% Certified" }
  },
  {
    id: "PROD-117",
    name: "Hydrating Glow Lip Oil & Gloss Set",
    category: "Beauty",
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviews: 195,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=600&q=80",
    description: "Non-sticky moisturizing lip oil infused with jojoba oil and hyaluronic acid for high-shine glossy lips.",
    specs: { "Volume": "10ml x 3", "Ingredients": "Jojoba & Hyaluronic" }
  },
  {
    id: "PROD-110",
    name: "Velour Crystal Luxury Eau De Parfum",
    category: "Beauty",
    price: 65.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviews: 305,
    badge: "Bestseller",
    image: "images/perfume_1788842960950.jpg",
    description: "Exquisite long-lasting perfume infused with wild jasmine, amber wood, and Madagascar vanilla blossom.",
    specs: { "Volume": "100ml / 3.4 oz", "Scent": "Floral & Amber" }
  },

  // --- Category: Slippers & Footwear ---
  {
    id: "PROD-115",
    name: "Cozy Cloud Memory Foam House Slippers",
    category: "Slippers & Footwear",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 580,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-soft plush fleece indoor slippers with high-density memory foam cushioning and anti-slip rubber sole.",
    specs: { "Upper": "Plush Faux Fur", "Sole": "Non-Slip Rubber", "Insole": "Memory Foam" }
  },
  {
    id: "PROD-116",
    name: "Chic Soft Leather Slide Slippers",
    category: "Slippers & Footwear",
    price: 34.99,
    originalPrice: 48.00,
    rating: 4.7,
    reviews: 240,
    badge: "New",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    description: "Elegant casual slip-on slides crafted with soft vegan leather and cushioned arch support footbed.",
    specs: { "Material": "Soft Vegan Leather", "Style": "Summer Slip-On", "Color": "Nude Blush Pink" }
  },
  {
    id: "PROD-118",
    name: "Fluffy Cross-Band Plush Slippers",
    category: "Slippers & Footwear",
    price: 22.50,
    originalPrice: 30.00,
    rating: 4.8,
    reviews: 320,
    badge: "Cozy",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    description: "Stylish open-toe cross band house slippers made with cloud-soft fleece for indoor and outdoor lounging.",
    specs: { "Design": "Open-Toe Cross Band", "Material": "Microfiber Faux Fur" }
  },
  {
    id: "PROD-105",
    name: "CyberStride Nitro Urban Sneakers",
    category: "Slippers & Footwear",
    price: 119.00,
    originalPrice: 159.00,
    rating: 4.9,
    reviews: 512,
    badge: "Trending",
    image: "images/sneakers_1788763537283.jpg",
    description: "Futuristic lightweight running sneakers engineered with responsive shock-absorbing NitroGel midsoles.",
    specs: { "Sole": "NitroGel Cushioning", "Material": "Breathable Flyknit" }
  },

  // --- Category: Electronics & Tech ---
  {
    id: "PROD-101",
    name: "AuraSound Pro Wireless Headphones",
    category: "Electronics",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 342,
    badge: "Bestseller",
    image: "images/headphones_1788763327314.jpg",
    description: "Premium over-ear noise-cancelling headphones featuring 40mm titanium drivers and 40-hour battery life.",
    specs: { "Battery": "40 Hours", "Bluetooth": "5.3 Multi-point", "ANC": "Hybrid Active" }
  },
  {
    id: "PROD-103",
    name: "WaveBoom Portable Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviews: 185,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    description: "Compact waterproof wireless speaker delivering 360-degree deep bass punch, 15-hour playtime, and IPX7 rating.",
    specs: { "Power": "20W RMS", "Battery": "15 Hours", "Rating": "IPX7 Waterproof" }
  },
  {
    id: "PROD-111",
    name: "LuminaDesk LED Smart Task Lamp",
    category: "Electronics",
    price: 45.00,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 115,
    badge: "Eco",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80",
    description: "Eye-caring dimmable architect desk lamp with 5 color temperatures, wireless phone charging pad base.",
    specs: { "Brightness": "1000 Lumens", "Wireless Charging": "10W Qi Pad" }
  },
  {
    id: "PROD-112",
    name: "HydroFlex Vacuum Insulated Water Bottle",
    category: "Electronics",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 270,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    description: "Double-wall stainless steel thermal water bottle keeping beverages ice-cold for 24 hours.",
    specs: { "Capacity": "32 oz (950ml)", "Insulation": "24h Cold / 12h Hot" }
  }
];

// Fallback image constant
const FALLBACK_IMG = "https://images.unsplash.com/photo-1611591475179-425d47f9be8b?auto=format&fit=crop&w=600&q=80";

// 2. Mock Orders Dataset
const mockOrders = {
  "ORD-8921": {
    orderId: "ORD-8921",
    customer: "Alex Rivera",
    date: "Sep 5, 2026",
    status: "Out for Delivery",
    currentStep: 4,
    carrier: "FedEx Express",
    trackingNum: "FX-99382019-US",
    estimatedDelivery: "Today, Sep 8 by 4:30 PM",
    item: "Sovereign Chronograph Analog Quartz Watch",
    total: 129.00
  },
  "ORD-7742": {
    orderId: "ORD-7742",
    customer: "Alex Rivera",
    date: "Aug 25, 2026",
    status: "Delivered",
    currentStep: 5,
    carrier: "DHL Express",
    trackingNum: "DHL-48301924-US",
    estimatedDelivery: "Delivered Aug 28, 2026",
    item: "Elegant Floral Puff-Sleeve Summer Top",
    total: 27.99
  },
  "ORD-3109": {
    orderId: "ORD-3109",
    customer: "Alex Rivera",
    date: "Sep 2, 2026",
    status: "Return Processing",
    currentStep: 2,
    carrier: "UPS Ground",
    trackingNum: "1Z99999999999999",
    estimatedDelivery: "Pending Item Scan",
    item: "Vintage Genuine Bifold Leather Wallet",
    total: 26.99
  }
};

// 3. Application State & Local Storage Setup
let cart = JSON.parse(localStorage.getItem('shopsizzle_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('shopsizzle_wishlist')) || [];
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'featured';

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderProducts(getFilteredProducts());
  updateCartUI();
  updateWishlistUI();

  // Event Listeners
  setupCategoryPills();
  setupSearchInput();
  setupSortSelect();
  setupCartDrawer();
  setupTrackForm();
}

// 4. Products Rendering Engine
function renderProducts(itemsToRender) {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-products');
  const countEl = document.getElementById('results-count');

  if (!grid) return;

  if (itemsToRender.length === 0) {
    grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    if (countEl) countEl.textContent = 'Showing 0 items';
    return;
  }

  grid.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';
  if (countEl) countEl.textContent = `Showing ${itemsToRender.length} items`;

  grid.innerHTML = itemsToRender.map(p => {
    const isWishlisted = wishlist.includes(p.id);
    return `
      <div class="product-card">
        <div class="card-img-wrap" onclick="openProductModal('${p.id}')">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_IMG}';">
          ${p.badge ? `<span class="product-badge-tag">${p.badge}</span>` : ''}
          <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist('${p.id}')" title="Add to Wishlist">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="product-cat-tag">${p.category}</span>
          <h3 class="product-title" onclick="openProductModal('${p.id}')">${p.name}</h3>

          <div class="product-rating">
            <div class="stars">
              ${renderStars(p.rating)}
            </div>
            <span><strong>${p.rating}</strong> (${p.reviews})</span>
          </div>

          <div class="product-price-wrap">
            <span class="current-price">$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="old-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>

          <button class="add-cart-btn" onclick="addToCart('${p.id}')">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderStars(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }
  if (hasHalf) {
    starsHtml += '<i class="fas fa-star-half-alt"></i>';
  }
  return starsHtml;
}

// 5. Filtering & Searching Logic
function getFilteredProducts() {
  let filtered = [...products];

  // Category Filter
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
  }

  // Search Filter
  if (currentSearch.trim() !== '') {
    const q = currentSearch.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sort Filter
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

function filterByCategory(categoryName) {
  showSection('shop');
  currentCategory = categoryName;
  document.querySelectorAll('.cat-pill').forEach(pill => {
    if (pill.getAttribute('data-category').toLowerCase() === categoryName.toLowerCase()) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
  renderProducts(getFilteredProducts());
  scrollToProducts();
}

function setupCategoryPills() {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      renderProducts(getFilteredProducts());
    });
  });
}

function setupSearchInput() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-search');

  if (!input) return;

  input.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    if (clearBtn) clearBtn.style.display = currentSearch ? 'block' : 'none';
    renderProducts(getFilteredProducts());
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      currentSearch = '';
      clearBtn.style.display = 'none';
      renderProducts(getFilteredProducts());
    });
  }

  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      input.value = '';
      currentSearch = '';
      currentCategory = 'all';
      if (clearBtn) clearBtn.style.display = 'none';
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      document.querySelector('.cat-pill[data-category="all"]').classList.add('active');
      renderProducts(getFilteredProducts());
    });
  }
}

function setupSortSelect() {
  const select = document.getElementById('sort-select');
  if (select) {
    select.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts(getFilteredProducts());
    });
  }
}

// 6. Product Details Modal
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const backdrop = document.getElementById('product-modal-backdrop');
  const content = document.getElementById('product-modal-content');

  content.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='${FALLBACK_IMG}';">
    </div>

    <div class="modal-details">
      <span class="badge-pill">${product.category}</span>
      <h2>${product.name}</h2>

      <div class="product-rating" style="margin-bottom:0.75rem;">
        <div class="stars">${renderStars(product.rating)}</div>
        <span><strong>${product.rating}</strong> (${product.reviews} reviews)</span>
      </div>

      <div class="product-price-wrap">
        <span class="current-price" style="font-size:1.5rem;">$${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="old-price" style="font-size:1.1rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
      </div>

      <p class="modal-desc">${product.description}</p>

      ${product.specs ? `
        <div class="specs-list">
          <strong style="display:block; margin-bottom:0.4rem; color:var(--text-dark);">Product Features & Specs:</strong>
          ${Object.entries(product.specs).map(([k, v]) => `<div><span>${k}:</span> <strong>${v}</strong></div>`).join('')}
        </div>
      ` : ''}

      <div style="display:flex; gap:0.75rem; align-items:center; margin-top:1.25rem;">
        <div class="cart-qty-ctrl" style="margin:0;">
          <button class="qty-btn" onclick="adjustModalQty(-1)">-</button>
          <span id="modal-qty-val" style="font-weight:700; width:24px; text-align:center;">1</span>
          <button class="qty-btn" onclick="adjustModalQty(1)">+</button>
        </div>

        <button class="btn btn-primary" style="flex:1;" onclick="addModalItemToCart('${product.id}')">
          <i class="fas fa-shopping-bag"></i> Add to Cart
        </button>
      </div>
    </div>
  `;

  backdrop.style.display = 'flex';
}

function closeProductModal() {
  document.getElementById('product-modal-backdrop').style.display = 'none';
}

let modalQty = 1;
function adjustModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  const el = document.getElementById('modal-qty-val');
  if (el) el.textContent = modalQty;
}

function addModalItemToCart(productId) {
  addToCart(productId, modalQty);
  closeProductModal();
  modalQty = 1;
}

// 7. Cart & Wishlist Management
function addToCart(productId, qty = 1) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }

  saveCart();
  updateCartUI();
  showToast("Added to ShopSizzle Cart!");
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

function saveCart() {
  localStorage.setItem('shopsizzle_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countBadge = document.getElementById('cart-count');
  const itemCountHeader = document.getElementById('cart-item-count');
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const deliveryEl = document.getElementById('cart-delivery');
  const totalEl = document.getElementById('cart-total');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.textContent = totalCount;
  if (itemCountHeader) itemCountHeader.textContent = totalCount;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <i class="fas fa-shopping-bag fa-3x" style="margin-bottom:1rem; opacity:0.4;"></i>
        <p>Your ShopSizzle cart is empty.</p>
        <button class="btn btn-outline" style="margin-top:1rem;" onclick="closeCartDrawer()">Start Shopping</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    const itemTotal = product.price * item.qty;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" onerror="this.onerror=null; this.src='${FALLBACK_IMG}';">
        <div class="cart-item-info">
          <div class="cart-item-title">${product.name}</div>
          <div class="cart-item-price">$${product.price.toFixed(2)}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty('${product.id}', -1)">-</button>
            <span style="font-size:0.85rem; font-weight:700; width:20px; text-align:center;">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${product.id}', 1)">+</button>
            <button class="remove-item-btn" onclick="removeFromCart('${product.id}')" title="Remove item">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function setupCartDrawer() {
  const btn = document.getElementById('cart-btn');
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const closeBtn = document.getElementById('close-cart-btn');

  if (btn && drawer && backdrop) {
    btn.addEventListener('click', () => {
      drawer.classList.add('open');
      backdrop.style.display = 'block';
    });
  }

  if (closeBtn && drawer && backdrop) {
    closeBtn.addEventListener('click', closeCartDrawer);
    backdrop.addEventListener('click', closeCartDrawer);
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.style.display = 'none';
}

function toggleWishlist(productId) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    showToast("Removed from wishlist");
  } else {
    wishlist.push(productId);
    showToast("Added to wishlist ❤️");
  }
  localStorage.setItem('shopsizzle_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts(getFilteredProducts());
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-count');
  if (badge) badge.textContent = wishlist.length;
}

// 8. Checkout & Order Flow
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal-backdrop');
  const newId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
  const idEl = document.getElementById('new-order-id');
  if (idEl) idEl.textContent = newId;

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();

  if (modal) modal.style.display = 'flex';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal-backdrop');
  if (modal) modal.style.display = 'none';
}

function trackNewOrder() {
  const idEl = document.getElementById('new-order-id');
  const orderId = idEl ? idEl.textContent : 'ORD-8921';
  closeCheckoutModal();
  showSection('track');
  setTrackId(orderId);
}

// 9. Order Tracking Engine
function setupTrackForm() {
  const form = document.getElementById('track-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('track-order-id');
      if (input) trackOrder(input.value);
    });
  }
}

function setTrackId(id) {
  const input = document.getElementById('track-order-id');
  if (input) input.value = id;
  trackOrder(id);
}

function trackOrder(orderId) {
  const cleanId = orderId.trim().toUpperCase();
  const container = document.getElementById('track-result-container');
  if (!container) return;

  const order = mockOrders[cleanId] || {
    orderId: cleanId,
    customer: "Valued Customer",
    date: "Sep 8, 2026",
    status: "Order Confirmed",
    currentStep: 1,
    carrier: "Standard Delivery",
    trackingNum: "TRK-" + Math.floor(1000000 + Math.random() * 9000000),
    estimatedDelivery: "Sep 11, 2026",
    item: "ShopSizzle Fashion & Accessory Item",
    total: 39.99
  };

  const stepPct = Math.min(100, Math.max(0, ((order.currentStep - 1) / 4) * 100));

  container.style.display = 'block';
  container.innerHTML = `
    <div class="track-meta">
      <div>
        <span class="order-id-badge"><i class="fas fa-box-open"></i> Order ${order.orderId}</span>
        <div style="font-size:0.8rem; color:var(--text-muted);">Placed on ${order.date} • Total: $${order.total.toFixed(2)}</div>
      </div>
      <span class="badge-pill" style="background:#e0e7ff; color:var(--primary); font-size:0.85rem;">${order.status}</span>
    </div>

    <!-- Progress Line Stepper -->
    <div class="stepper-wrapper">
      <div class="stepper-line">
        <div class="stepper-line-fill" style="width: ${stepPct}%;"></div>
      </div>

      <div class="step-node ${order.currentStep >= 1 ? (order.currentStep > 1 ? 'completed' : 'active') : ''}">
        <div class="step-circle"><i class="fas fa-check"></i></div>
        <span class="step-label">Confirmed</span>
      </div>

      <div class="step-node ${order.currentStep >= 2 ? (order.currentStep > 2 ? 'completed' : 'active') : ''}">
        <div class="step-circle"><i class="fas fa-box"></i></div>
        <span class="step-label">Packed</span>
      </div>

      <div class="step-node ${order.currentStep >= 3 ? (order.currentStep > 3 ? 'completed' : 'active') : ''}">
        <div class="step-circle"><i class="fas fa-truck"></i></div>
        <span class="step-label">Shipped</span>
      </div>

      <div class="step-node ${order.currentStep >= 4 ? (order.currentStep > 4 ? 'completed' : 'active') : ''}">
        <div class="step-circle"><i class="fas fa-truck-ramp-box"></i></div>
        <span class="step-label">Out for Delivery</span>
      </div>

      <div class="step-node ${order.currentStep >= 5 ? 'completed' : ''}">
        <div class="step-circle"><i class="fas fa-house-chimney"></i></div>
        <span class="step-label">Delivered</span>
      </div>
    </div>

    <div class="track-details-box">
      <div>
        <span>Carrier Name</span>
        <strong>${order.carrier}</strong>
      </div>
      <div>
        <span>Tracking Number</span>
        <strong><code>${order.trackingNum}</code></strong>
      </div>
      <div>
        <span>Estimated Delivery</span>
        <strong style="color:var(--success);">${order.estimatedDelivery}</strong>
      </div>
      <div>
        <span>Item Included</span>
        <strong>${order.item}</strong>
      </div>
    </div>
  `;
}

// 10. Navigation Section Swapping
function showSection(sectionName) {
  const shopSection = document.getElementById('shop-section');
  const trackSection = document.getElementById('track-section');
  const navHome = document.getElementById('nav-home');
  const navShop = document.getElementById('nav-shop');
  const navTrack = document.getElementById('nav-track');

  if (sectionName === 'track') {
    if (shopSection) shopSection.style.display = 'none';
    if (trackSection) trackSection.style.display = 'block';
    if (navHome) navHome.classList.remove('active');
    if (navShop) navShop.classList.remove('active');
    if (navTrack) navTrack.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    if (shopSection) shopSection.style.display = 'block';
    if (trackSection) trackSection.style.display = 'none';
    if (navHome) navHome.classList.add('active');
    if (navTrack) navTrack.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function scrollToProducts() {
  showSection('shop');
  const el = document.getElementById('products');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToCategories() {
  showSection('shop');
  const el = document.getElementById('categories');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// 11. Floating AI Assistant Chatbot Logic
function toggleChatbot() {
  const win = document.getElementById('chatbot-window');
  if (win) {
    win.style.display = (win.style.display === 'none' || !win.style.display) ? 'flex' : 'none';
  }
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('chat-input-field');
  if (input) input.value = promptText;
  handleChatSubmit(new Event('submit'));
}

function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-input-field');
  const messagesBox = document.getElementById('chat-messages');

  if (!input || !messagesBox || !input.value.trim()) return;

  const userText = input.value.trim();
  input.value = '';

  // Append user message
  messagesBox.innerHTML += `
    <div class="user-msg">
      <p>${userText}</p>
    </div>
  `;
  messagesBox.scrollTop = messagesBox.scrollHeight;

  // Simulate SizzleAI Agent Thinking
  setTimeout(() => {
    const reply = generateAiReply(userText);
    messagesBox.innerHTML += `
      <div class="bot-msg">
        <p>${reply}</p>
      </div>
    `;
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, 600);
}

function generateAiReply(query) {
  const q = query.toLowerCase();

  if (q.includes('top') || q.includes('girl') || q.includes('western') || q.includes('dress')) {
    return "👗 We have gorgeous **Girls Floral Puff-Sleeve Summer Tops** ($27.99) and **A-Line Western Dresses** ($49.99)! Perfect for casual and party wear.";
  }
  if (q.includes('bangle') || q.includes('watch') || q.includes('jewel') || q.includes('necklace')) {
    return "⌚ Check out our **Minimalist Sterling Silver Bangle Bracelet** ($35.00), **18K Gold Necklace** ($28.99) and **Sovereign Chronograph Watch** ($129.00)!";
  }
  if (q.includes('wallet') || q.includes('belt') || q.includes('bag')) {
    return "👛 Explore our **Vintage Genuine Bifold Leather Wallet** ($26.99) and **Designer Genuine Leather Dress Belt** ($29.50)! Premium cowhide leather.";
  }
  if (q.includes('men') || q.includes('shirt') || q.includes('jacket') || q.includes('hoodie')) {
    return "👔 For men, check out our **Slim Fit Cotton Oxford Shirt** ($34.99) and **Heavyweight Denim Trucker Jacket** ($59.99)!";
  }
  if (q.includes('makeup') || q.includes('lipstick') || q.includes('beauty')) {
    return "💄 Check out our best-selling **Glitz & Glow Velvet Matte Lipstick Set** ($24.99) or **Rose Gold Eyeshadow Palette** ($32.00)!";
  }
  if (q.includes('slipper') || q.includes('slide') || q.includes('footwear')) {
    return "👡 We have super comfy **Cozy Cloud Memory Foam Slippers** ($19.99) and **Chic Soft Leather Slides** ($34.99)!";
  }
  if (q.includes('order') || q.includes('track') || q.includes('ord-')) {
    return "📦 Enter your order ID (e.g. **#ORD-8921**) in the Track Order section to get live shipment updates!";
  }
  return "✨ Welcome to **ShopSizzle**! Ask me anything about silver bangles, tops, watches, wallets, makeup, or slippers.";
}

// 12. Helpers
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2500);
}

function openHelpModal() {
  toggleChatbot();
}
