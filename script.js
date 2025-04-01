
// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const currentYear = document.getElementById('current-year');
const floatingImage = document.getElementById('floating-image');
const prevProductBtn = document.getElementById('prev-product');
const nextProductBtn = document.getElementById('next-product');
const productsCarousel = document.getElementById('products-carousel');
const productDots = document.getElementById('product-dots');
const communityGrid = document.querySelector('.community-grid');

// Set current year in footer
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Products Data
const products = [
  {
    id: 1,
    name: "Cozy Home Blanket",
    image: "https://images.unsplash.com/photo-1544219560-76c456a887e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Home Decor",
    price: "$85.00",
    rating: 4.9,
    reviews: 124
  },
  {
    id: 2,
    name: "Handmade Baby Set",
    image: "https://images.unsplash.com/photo-1566055909643-a51b4271d2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    category: "Baby Collection",
    price: "$45.00",
    rating: 5.0,
    reviews: 87
  },
  {
    id: 3,
    name: "Winter Beanie",
    image: "https://images.unsplash.com/photo-1599769899212-1a87c66f0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    category: "Accessories",
    price: "$29.99",
    rating: 4.7,
    reviews: 56
  },
  {
    id: 4,
    name: "Decorative Pillows",
    image: "https://images.unsplash.com/photo-1534889156217-d643df14f14a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
    category: "Home Decor",
    price: "$38.50",
    rating: 4.8,
    reviews: 42
  },
  {
    id: 5,
    name: "Amigurumi Toys",
    image: "https://images.unsplash.com/photo-1545991826-3f3a82feed13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2562&q=80",
    category: "Toys",
    price: "$24.95",
    rating: 4.9,
    reviews: 63
  },
];

// Community Posts Data
const posts = [
  {
    id: 1,
    user: {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      title: "Crochet Artist"
    },
    content: "Just finished this rainbow blanket after three weeks of work! So happy with how the colors blend together.",
    image: "https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    likes: 124,
    comments: 28,
    time: "2 days ago"
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Beginner Crocheter"
    },
    content: "Made my first amigurumi! It's not perfect, but I'm proud of it. Thanks to everyone in this community for your tutorials and support!",
    image: "https://images.unsplash.com/photo-1601585465781-9c428fa39441?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    likes: 89,
    comments: 15,
    time: "1 week ago"
  },
  {
    id: 3,
    user: {
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      title: "Pattern Designer"
    },
    content: "Just released my new summer top pattern! Perfect for beginners looking to make something wearable. Link in bio to the full tutorial.",
    image: "https://images.unsplash.com/photo-1617320949029-52f4d9eec797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
    likes: 216,
    comments: 43,
    time: "3 days ago"
  }
];

// Initialize State
let activeProductIndex = 0;

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', mobileNav.classList.contains('hidden') ? 'false' : 'true');
  });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href) return;
    
    const targetElement = document.querySelector(href);
    if (!targetElement) return;
    
    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (mobileNav && !mobileNav.classList.contains('hidden')) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Floating effect on mouse move for hero image
if (floatingImage) {
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Subtle movement effect
    floatingImage.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
  });
}

// Generate Product Cards
function renderProducts() {
  if (!productsCarousel) return;
  
  productsCarousel.innerHTML = '';
  productDots.innerHTML = '';
  
  products.forEach((product, index) => {
    // Create product card
    const productCard = document.createElement('div');
    productCard.className = `product-card glass ${index === activeProductIndex ? 'active' : ''}`;
    productCard.id = `product-${index}`;
    
    // Generate stars based on rating
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
    
    productCard.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-category">${product.category}</div>
      </div>
      <div class="product-content">
        <div class="product-header">
          <h3 class="product-title">${product.name}</h3>
          <span class="product-price">${product.price}</span>
        </div>
        <div class="product-rating">
          <div class="rating-stars">${stars}</div>
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>
        <button class="add-to-cart-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    `;
    
    productsCarousel.appendChild(productCard);
    
    // Create dot for this product
    const dot = document.createElement('button');
    dot.className = `carousel-dot ${index === activeProductIndex ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to product ${index + 1}`);
    dot.addEventListener('click', () => {
      setActiveProduct(index);
    });
    
    productDots.appendChild(dot);
  });
  
  updateProductVisibility();
}

// Update which product is active
function setActiveProduct(index) {
  activeProductIndex = index;
  
  // Update all product cards and dots
  document.querySelectorAll('.product-card').forEach((card, i) => {
    if (i === activeProductIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
  
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    if (i === activeProductIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
  
  updateProductVisibility();
}

// Make sure the active product is visible
function updateProductVisibility() {
  const activeCard = document.getElementById(`product-${activeProductIndex}`);
  if (activeCard && productsCarousel) {
    productsCarousel.scrollTo({
      left: activeCard.offsetLeft - (productsCarousel.offsetWidth - activeCard.offsetWidth) / 2,
      behavior: 'smooth'
    });
  }
}

// Product navigation buttons
if (prevProductBtn) {
  prevProductBtn.addEventListener('click', () => {
    const newIndex = activeProductIndex === 0 ? products.length - 1 : activeProductIndex - 1;
    setActiveProduct(newIndex);
  });
}

if (nextProductBtn) {
  nextProductBtn.addEventListener('click', () => {
    const newIndex = activeProductIndex === products.length - 1 ? 0 : activeProductIndex + 1;
    setActiveProduct(newIndex);
  });
}

// Handle product carousel scroll
if (productsCarousel) {
  productsCarousel.addEventListener('scroll', () => {
    if (productsCarousel.scrollWidth <= productsCarousel.clientWidth) return;
    
    const scrollPosition = productsCarousel.scrollLeft;
    const itemWidth = productsCarousel.scrollWidth / products.length;
    const newIndex = Math.round(scrollPosition / itemWidth);
    
    if (newIndex !== activeProductIndex && newIndex >= 0 && newIndex < products.length) {
      setActiveProduct(newIndex);
    }
  });
}

// Generate Community Posts
function renderCommunityPosts() {
  if (!communityGrid) return;
  
  communityGrid.innerHTML = '';
  
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'community-card glass fade-in';
    postElement.style.animationDelay = `${index * 0.1}s`;
    
    postElement.innerHTML = `
      <div class="community-image">
        <img src="${post.image}" alt="Post by ${post.user.name}">
      </div>
      <div class="community-content">
        <div class="community-user">
          <img src="${post.user.avatar}" alt="${post.user.name}" class="user-avatar">
          <div class="user-info">
            <h4>${post.user.name}</h4>
            <p>${post.user.title}</p>
          </div>
        </div>
        <p class="community-text">${post.content}</p>
        <div class="post-meta">
          <span>${post.time}</span>
        </div>
        <div class="post-actions">
          <button class="action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>${post.likes}</span>
          </button>
          <button class="action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>${post.comments}</span>
          </button>
          <button class="action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    `;
    
    communityGrid.appendChild(postElement);
  });
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCommunityPosts();
  
  // Initialize animations for elements that are visible on page load
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
      element.style.opacity = '1';
    }
  });
});

// Animate elements as they scroll into view
window.addEventListener('scroll', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
      element.style.opacity = '1';
    }
  });
});

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('This feature is not implemented in this demo. In a real application, this would submit the form data to a server.');
  });
});

// Add click handlers for buttons
document.querySelectorAll('button:not([type="submit"])').forEach(button => {
  if (!button.closest('.carousel-nav-btn') && 
      !button.closest('.carousel-dot') && 
      !button.closest('.mobile-menu-toggle') &&
      !button.closest('.action-btn')) {
    button.addEventListener('click', function() {
      alert('This feature is not implemented in this demo. In a real application, this would perform the associated action.');
    });
  }
});
