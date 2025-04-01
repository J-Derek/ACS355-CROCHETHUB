
document.addEventListener('DOMContentLoaded', function() {
    // Filter toggle functionality
    const filterToggle = document.getElementById('filter-toggle');
    const filters = document.getElementById('filters');
    
    if (filterToggle && filters) {
        filterToggle.addEventListener('click', function() {
            filters.style.display = filters.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close filters when clicking outside
        document.addEventListener('click', function(event) {
            if (!filters.contains(event.target) && event.target !== filterToggle) {
                filters.style.display = 'none';
            }
        });
    }
    
    // Product filtering
    const checkboxes = document.querySelectorAll('.filter');
    const products = document.querySelectorAll('.product-card');
    
    if (checkboxes.length > 0 && products.length > 0) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', filterProducts);
        });
        
        function filterProducts() {
            const selectedCategories = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            products.forEach(product => {
                const category = product.getAttribute('data-category');
                
                if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    }

    // Shopping cart functionality
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.getElementById('cart-count');
    const miniCart = document.getElementById('mini-cart');
    const cartToggle = document.getElementById('cart-toggle');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count badge
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Update mini cart display
    function updateMiniCart() {
        if (cartItemsList && cartTotal) {
            cartItemsList.innerHTML = '';
            
            let total = 0;
            
            if (cartItems.length === 0) {
                cartItemsList.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
            } else {
                cartItems.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const cartItem = document.createElement('li');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>${item.quantity} × KES ${item.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-item" data-index="${index}">×</button>
                    `;
                    cartItemsList.appendChild(cartItem);
                });
            }
            
            cartTotal.textContent = `KES ${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cartItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartCount();
                    updateMiniCart();
                });
            });
        }
    }
    
    // Toggle mini cart visibility
    if (cartToggle && miniCart) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            miniCart.classList.toggle('active');
        });
        
        // Close mini cart when clicking outside
        document.addEventListener('click', function(event) {
            if (!miniCart.contains(event.target) && event.target !== cartToggle && !cartToggle.contains(event.target)) {
                miniCart.classList.remove('active');
            }
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const card = this.closest('.product-card');
                const name = card.querySelector('h3').textContent;
                const priceText = card.querySelector('.product-info p').textContent;
                const price = parseFloat(priceText.replace('KES ', ''));
                const image = card.querySelector('img').src;
                
                // Check if item is already in cart
                const existingItemIndex = cartItems.findIndex(item => item.name === name);
                
                if (existingItemIndex > -1) {
                    // Item exists, increase quantity
                    cartItems[existingItemIndex].quantity += 1;
                } else {
                    // Add new item
                    cartItems.push({
                        name,
                        price,
                        image,
                        quantity: 1
                    });
                }
                
                // Save to local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Show added to cart message
                showToast(`${name} added to cart!`);
                
                // Update cart UI
                updateCartCount();
                updateMiniCart();
            });
        });
    }
    
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (quickViewButtons.length > 0 && quickViewModal) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const card = this.closest('.product-card');
                const name = card.querySelector('h3').textContent;
                const priceText = card.querySelector('.product-info p').textContent;
                const image = card.querySelector('img').src;
                const category = card.getAttribute('data-category');
                
                // Fill modal with product data
                document.getElementById('modal-product-image').src = image;
                document.getElementById('modal-product-name').textContent = name;
                document.getElementById('modal-product-price').textContent = priceText;
                document.getElementById('modal-product-category').textContent = category;
                
                // Show modal
                quickViewModal.style.display = 'flex';
            });
        });
        
        // Close modal on click
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                quickViewModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(event) {
                if (event.target === quickViewModal) {
                    quickViewModal.style.display = 'none';
                }
            });
        }
    }
    
    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Initialize cart
    updateCartCount();
    updateMiniCart();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
