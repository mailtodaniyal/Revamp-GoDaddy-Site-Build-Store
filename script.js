        // Main JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            setTimeout(() => {
                document.getElementById('preloader').style.opacity = '0';
                document.getElementById('preloader').style.visibility = 'hidden';
            }, 1500);
            
            // Mobile Menu Toggle
            const hamburger = document.getElementById('hamburger');
            const mobileMenu = document.getElementById('mobileMenu');
            const closeMenu = document.getElementById('closeMenu');
            const overlay = document.getElementById('overlay');
            
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            overlay.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                cartSidebar.classList.remove('active');
                searchModal.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Cart Toggle
            const cartBtn = document.getElementById('cartBtn');
            const cartSidebar = document.getElementById('cartSidebar');
            const closeCart = document.getElementById('closeCart');
            
            cartBtn.addEventListener('click', () => {
                cartSidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Search Toggle
            const searchBtn = document.getElementById('searchBtn');
            const searchModal = document.getElementById('searchModal');
            const closeSearch = document.getElementById('closeSearch');
            
            searchBtn.addEventListener('click', () => {
                searchModal.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeSearch.addEventListener('click', () => {
                searchModal.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Back to Top Button
            const backToTop = document.getElementById('backToTop');
            const header = document.getElementById('header');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('active');
                    header.classList.add('scrolled');
                } else {
                    backToTop.classList.remove('active');
                    header.classList.remove('scrolled');
                }
            });
            
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Testimonial Slider
            const testimonialSlider = document.querySelector('.testimonial-slider');
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.slider-dot');
            const prevBtn = document.getElementById('sliderPrev');
            const nextBtn = document.getElementById('sliderNext');
            let currentSlide = 0;
            
            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                currentSlide = index;
            }
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
            
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            }
            
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });
            
            // Auto slide
            setInterval(nextSlide, 5000);
            
            // Cart Functionality
            const addToCartBtns = document.querySelectorAll('.add-to-cart');
            const cartItemsContainer = document.getElementById('cartItems');
            const cartSubtotal = document.getElementById('cartSubtotal');
            const cartTotalPrice = document.getElementById('cartTotalPrice');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const cartTotalSection = document.getElementById('cartTotal');
            const cartCount = document.querySelector('.cart-count');
            const emptyCartMsg = document.querySelector('.empty-cart');
            
            let cart = [];
            
            addToCartBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const productCard = btn.closest('.product-card');
                    const productId = productCard.querySelector('.product-title').textContent;
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', '').replace(',', ''));
                    const productImage = productCard.querySelector('.product-image').src;
                    const productCategory = productCard.querySelector('.product-category').textContent;
                    
                    // Check if product already in cart
                    const existingItem = cart.find(item => item.id === productId);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({
                            id: productId,
                            title: productTitle,
                            price: productPrice,
                            image: productImage,
                            category: productCategory,
                            quantity: 1
                        });
                    }
                    
                    updateCart();
                    
                    // Animation feedback
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    btn.style.backgroundColor = 'var(--dark-gold)';
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fas fa-shopping-bag"></i>';
                        btn.style.backgroundColor = 'white';
                    }, 1000);
                });
            });
            
            function updateCart() {
                // Update cart UI
                cartItemsContainer.innerHTML = '';
                
                if (cart.length === 0) {
                    emptyCartMsg.style.display = 'block';
                    cartTotalSection.style.display = 'none';
                    checkoutBtn.style.display = 'none';
                } else {
                    emptyCartMsg.style.display = 'none';
                    cartTotalSection.style.display = 'block';
                    checkoutBtn.style.display = 'block';
                    
                    let subtotal = 0;
                    
                    cart.forEach(item => {
                        subtotal += item.price * item.quantity;
                        
                        const cartItem = document.createElement('div');
                        cartItem.className = 'cart-item';
                        cartItem.innerHTML = `
                            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                            <div class="cart-item-details">
                                <h4 class="cart-item-title">${item.title}</h4>
                                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                                <div class="cart-item-quantity">
                                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        `;
                        
                        cartItemsContainer.appendChild(cartItem);
                    });
                    
                    // Update totals
                    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
                    cartTotalPrice.textContent = `$${subtotal.toFixed(2)}`;
                    
                    // Update cart count
                    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
                    cartCount.textContent = totalItems;
                    
                    // Add event listeners to quantity buttons
                    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = btn.getAttribute('data-id');
                            const item = cart.find(item => item.id === id);
                            
                            if (item.quantity > 1) {
                                item.quantity -= 1;
                                updateCart();
                            }
                        });
                    });
                    
                    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = btn.getAttribute('data-id');
                            const item = cart.find(item => item.id === id);
                            
                            item.quantity += 1;
                            updateCart();
                        });
                    });
                    
                    // Add event listeners to remove buttons
                    document.querySelectorAll('.remove-item').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = btn.getAttribute('data-id');
                            cart = cart.filter(item => item.id !== id);
                            updateCart();
                        });
                    });
                }
            }
            
            // Checkout button
            checkoutBtn.addEventListener('click', () => {
                alert(`Proceeding to checkout with ${cart.reduce((total, item) => total + item.quantity, 0)} items totaling $${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`);
                // In a real implementation, this would redirect to a checkout page
            });
            
            // Newsletter form
            const newsletterForm = document.querySelector('.newsletter-form');
            
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                
                // In a real implementation, this would send the email to your backend
                alert(`Thank you for subscribing with ${email}! You'll receive our next newsletter soon.`);
                newsletterForm.reset();
            });
            
            // Search form
            const searchForm = document.querySelector('.search-form');
            
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = searchForm.querySelector('.search-input').value;
                
                // In a real implementation, this would search for products
                alert(`Searching for: ${query}`);
                searchModal.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                searchForm.reset();
            });
            
            // Collection card animations
            const collectionCards = document.querySelectorAll('.collection-card');
            
            collectionCards.forEach((card, index) => {
                const title = card.querySelector('.collection-title');
                const desc = card.querySelector('.collection-description');
                const link = card.querySelector('.collection-link');
                
                // Set staggered animation delays
                title.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
                desc.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
                link.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
                
                // Trigger animations when card is in viewport
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            title.style.transform = 'translateY(0)';
                            title.style.opacity = '1';
                            desc.style.transform = 'translateY(0)';
                            desc.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                            link.style.opacity = '1';
                        }
                    });
                });
                
                observer.observe(card);
            });
        });
