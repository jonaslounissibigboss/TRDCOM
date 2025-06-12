// ==========================================================================
// FERRARI-INSPIRED PERSONAL WEBSITE INTERACTIVE FUNCTIONALITY
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Personal website scripts loaded. Initializing Ferrari-inspired functionality...');    // Logo Intro Animation (first priority)
    initializeLogoIntroAnimation();
    
    // Component Loading System (load components first)
    initializeComponentLoader();
    
    // Navigation & Header
    initializeNavigation();
    
    // Scroll Effects
    initializeScrollEffects();
    
    // Form Handling
    initializeFormHandling();    // Interactive Elements
    initializeInteractiveElements();
    
    // Asset Loading & Error Handling
    initializeAssetHandling();
    
    // Services Carousel
    initializeServicesCarousel();
    
    // Mobile Menu
    initializeMobileMenu();
      // Smooth Scrolling
    initializeSmoothScrolling();
      // Back to Top
    initializeBackToTop();
    
    // Scroll Buttons
    initializeScrollButtons();
    initializeScrollButtons();
});

// ==========================================================================
// LOGO INTRO ANIMATION
// ==========================================================================
function initializeLogoIntroAnimation() {
    const logoOverlay = document.getElementById('logo-intro-overlay');
    const body = document.body;
    
    if (!logoOverlay) {
        // If no logo overlay, ensure content is visible
        body.classList.remove('intro-active');
        const sections = document.querySelectorAll('header, main, footer');
        sections.forEach(section => {
            section.classList.add('main-content-reveal', 'show');
        });
        return;
    }
    
    // Add intro-active class to body to hide main content
    body.classList.add('intro-active');
    
    // Failsafe: Remove intro-active after maximum time
    setTimeout(() => {
        body.classList.remove('intro-active');
        const sections = document.querySelectorAll('header, main, footer');
        sections.forEach(section => {
            section.classList.add('main-content-reveal', 'show');
        });
    }, 6000);
    
    // Start the intro sequence
    setTimeout(() => {
        // Begin fade out of intro overlay after 3.5 seconds
        logoOverlay.classList.add('fade-out');
        
        // Create transitional logo element
        createLogoTransition();
        
        // After fade out completes, remove overlay and show main content
        setTimeout(() => {
            logoOverlay.style.display = 'none';
            body.classList.remove('intro-active');
            
            // Add reveal animation to main content
            const sections = document.querySelectorAll('header, main, footer');
            sections.forEach((section, index) => {
                section.classList.add('main-content-reveal');
                setTimeout(() => {
                    section.classList.add('show');
                }, index * 200);
            });
            
            // Initialize enhanced service animations
            initializeEnhancedServiceAnimations();
            
        }, 800); // Wait for fade out transition
        
    }, 3500); // Total intro duration
}

function createLogoTransition() {
    const transitionLogo = document.createElement('div');
    transitionLogo.className = 'header-logo-transition';
    transitionLogo.innerHTML = '<span style="font-size: 4rem; font-weight: bold; color: white; letter-spacing: 4px;">KOMMÆRSJ</span>';
    
    document.body.appendChild(transitionLogo);
    
    // Trigger transition to header position
    setTimeout(() => {
        transitionLogo.classList.add('move-to-header');
        
        // Remove transition element after animation
        setTimeout(() => {
            transitionLogo.remove();
        }, 1200);
    }, 100);
}

// ==========================================================================
// ENHANCED SERVICE ANIMATIONS
// ==========================================================================
function initializeEnhancedServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length === 0) {
        // If cards aren't loaded yet, wait and try again
        setTimeout(initializeEnhancedServiceAnimations, 500);
        return;
    }
    
    // Intersection Observer for service card animations
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150); // Stagger animation
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
        serviceObserver.observe(card);
        
        // Enhanced hover effects with ripple
        card.addEventListener('mouseenter', (e) => {
            createRippleEffect(e.target, e);
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(220, 20, 60, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Add keyframes if not already added
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ==========================================================================
// COMPONENT LOADING SYSTEM
// ==========================================================================
async function initializeComponentLoader() {
    console.log('Loading components...');
      const components = [
        { selector: 'header', file: 'components/header.html' },
        { selector: '#hero', file: 'components/hero.html' },
        { selector: '#about', file: 'components/about.html' },
        { selector: '#services', file: 'components/services.html' },
        { selector: '#reviews', file: 'components/reviews.html' },
        { selector: '#contact', file: 'components/contact.html' },
        { selector: 'footer', file: 'components/footer.html' }
    ];
    
    try {
        // Load all components in parallel
        const loadPromises = components.map(component => loadComponent(component.selector, component.file));
        await Promise.all(loadPromises);
        
        console.log('All components loaded successfully');        // Initialize component-dependent functionality after all components are loaded
        setTimeout(() => {
            initializeEnhancedServiceAnimations();
            initializeEnhancedReviewAnimations();
            initializeServicesCarousel();
            // Re-initialize navigation after components load
            initializeNavigation();
            initializeMobileMenu();
            // Re-initialize scroll effects to catch new elements
            initializeScrollEffects();
            
            // Debug: Check if about section is visible
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                console.log('About section found:', aboutSection);
                console.log('About section computed style:', window.getComputedStyle(aboutSection));
            } else {
                console.warn('About section not found after component loading');
            }
        }, 500); // Increased timeout to ensure components are fully loaded
        
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

async function loadComponent(selector, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}: ${response.status}`);
        }
        
        const html = await response.text();
        const element = document.querySelector(selector);
          if (element) {
            element.innerHTML = html;
            console.log(`Component loaded: ${file} -> ${selector}`);
            
            // Add debug info for about section
            if (selector === '#about') {
                console.log('About section content loaded:', element.innerHTML.substring(0, 100) + '...');
                console.log('About section element:', element);
            }
        } else {
            console.warn(`Selector not found: ${selector}`);
        }
        
    } catch (error) {
        console.error(`Error loading component ${file}:`, error);
        
        // Fallback content for critical sections
        const element = document.querySelector(selector);
        if (element && selector === '#hero') {
            element.innerHTML = `
                <div class="hero-container">
                    <div class="hero-content">
                        <h1 class="hero-title">KOMMÆRSJ</h1>
                        <p class="hero-subtitle">TRD Commercial Hub</p>
                        <div class="hero-buttons">
                            <a href="#about" class="btn btn-primary">Learn More</a>
                            <a href="#contact" class="btn btn-secondary">Contact Us</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// ==========================================================================
// NAVIGATION & HEADER FUNCTIONALITY
// ==========================================================================
function initializeNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Initializing navigation...', {
        header: !!header,
        navLinksFound: navLinks.length
    });
    
    if (!header) {
        console.warn('Header not found, navigation initialization skipped');
        return;
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (navLinks.length > 0) {
        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
                }
            });
        });

        // Navigation hover effects
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
        
        console.log('Navigation initialized successfully with', navLinks.length, 'links');
    } else {
        console.warn('No navigation links found');
    }
}

// ==========================================================================
// MOBILE MENU
// ==========================================================================
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuToggle || !mobileMenu) return;

    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuToggle.style.transform = 'rotate(90deg)';
        } else {
            mobileMenu.classList.remove('active');
            menuToggle.style.transform = 'rotate(0deg)';
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.style.transform = 'rotate(0deg)';
            isMenuOpen = false;
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.style.transform = 'rotate(0deg)';
            isMenuOpen = false;
        }
    });
}

// ==========================================================================
// SCROLL EFFECTS & ANIMATIONS
// ==========================================================================
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);    // Observe elements for scroll animations
    const elementsToObserve = [
        '.fade-in-left',
        '.fade-in-right',
        '.service-card',
        '.review-card',
        '.contact-item',
        '.contact-info',
        '.contact-form-container',
        '.stat-number'
    ];

    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-background');
        
        if (parallaxElement) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Animate numbers
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// ==========================================================================
// FORM HANDLING
// ==========================================================================
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success feedback
            showNotification('Takk for meldingen! Vi kommer tilbake til deg snart.', 'success');
            contactForm.reset();
            
            // Reset form field states
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const label = group.querySelector('label');
                if (input && label && !input.value) {
                    label.style.top = '1rem';
                    label.style.fontSize = '0.9rem';
                    label.style.color = 'var(--ferrari-gray-lighter)';
                }
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Det oppstod en feil. Prøv igjen senere.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Enhanced form field animations
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.top = '-0.5rem';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--accent-red)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.top = '1rem';
                    label.style.fontSize = '0.9rem';
                    label.style.color = 'var(--ferrari-gray-lighter)';
                }
            });
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--main-gold)' : 'var(--accent-red)'};
        color: var(--ferrari-white);
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-medium);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==========================================================================
// ENHANCED REVIEW ANIMATIONS
// ==========================================================================
function initializeEnhancedReviewAnimations() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach((card, index) => {
        // Add staggered entrance animation
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 150);
        
        // Add interactive star rating animation
        const stars = card.querySelectorAll('.star');
        card.addEventListener('mouseenter', () => {
            stars.forEach((star, starIndex) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.1)';
                    star.style.textShadow = '0 0 8px var(--main-gold-shadow)';
                }, starIndex * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            stars.forEach(star => {
                star.style.transform = 'scale(1)';
                star.style.textShadow = '0 0 5px var(--main-gold-shadow)';
            });
        });
    });
}

// ==========================================================================
// INTERACTIVE ELEMENTS
// ==========================================================================
function initializeInteractiveElements() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.service-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('service-card') 
                ? 'translateY(-15px) scale(1.02)' 
                : 'translateX(10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('service-card') 
                ? 'translateY(0) scale(1)' 
                : 'translateX(0)';
        });
    });
}

// ==========================================================================
// ASSET HANDLING & ERROR MANAGEMENT
// ==========================================================================
function initializeAssetHandling() {
    // Handle video loading errors
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            console.warn('Hero video failed to load, using fallback background');
            const fallback = document.querySelector('.hero-gif-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
            heroVideo.style.display = 'none';
        });
        
        heroVideo.addEventListener('loadeddata', () => {
            console.log('Hero video loaded successfully');
        });
    }
    
    // Handle image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn(`Image failed to load: ${img.src}`);
        });
    });
}

// ==========================================================================
// SERVICES CAROUSEL
// ==========================================================================
function initializeServicesCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    
    if (!carousel) {
        console.log('Services carousel not found, skipping initialization');
        return;
    }
    
    const cards = carousel.querySelectorAll('.service-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = window.innerWidth <= 768 ? 1 : 2;
    let isTransitioning = false;
    
    // Create carousel controls if they don't exist
    if (!document.querySelector('.carousel-controls')) {
        createCarouselControls();
    }
    
    function createCarouselControls() {
        const carouselContainer = carousel.closest('.services-carousel-container');
        if (!carouselContainer) return;
        
        const maxSlides = Math.ceil(totalCards / cardsPerView);
        const controlsHTML = `
            <div class="carousel-controls">
                <button class="carousel-btn prev" aria-label="Previous">
                    <div class="arrow-left"></div>
                </button>
                <div class="carousel-indicators">
                    ${Array.from({length: maxSlides}, (_, i) => 
                        `<div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
                    ).join('')}
                </div>
                <button class="carousel-btn next" aria-label="Next">
                    <div class="arrow-right"></div>
                </button>
            </div>
        `;
        
        carouselContainer.insertAdjacentHTML('afterend', controlsHTML);
        
        // Initialize events after creation
        initializeCarouselEvents();
    }
    
    function initializeCarouselEvents() {
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const indicators = document.querySelectorAll('.indicator');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', previousSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }
    
    function updateCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Calculate the correct translation - move by 2 cards (cardsPerView)
        const slideIndex = Math.floor(currentIndex / cardsPerView);
        const translateX = slideIndex * 100;
        
        carousel.style.transform = `translateX(-${translateX}%)`;
        
        // Update indicators
        const allIndicators = document.querySelectorAll('.indicator');
        allIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === slideIndex);
        });
        
        // Update button states
        const prevButton = document.querySelector('.carousel-btn.prev');
        const nextButton = document.querySelector('.carousel-btn.next');
        const maxSlides = Math.ceil(totalCards / cardsPerView);
        
        if (prevButton) {
            prevButton.disabled = slideIndex === 0;
        }
        
        if (nextButton) {
            nextButton.disabled = slideIndex >= maxSlides - 1;
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        
        const maxSlides = Math.ceil(totalCards / cardsPerView);
        const currentSlide = Math.floor(currentIndex / cardsPerView);
        
        if (currentSlide < maxSlides - 1) {
            currentIndex += cardsPerView; // Move by 2 cards (or 1 on mobile)
            if (currentIndex >= totalCards) {
                currentIndex = totalCards - cardsPerView;
            }
            updateCarousel();
        }
    }
    
    function previousSlide() {
        if (isTransitioning) return;
        
        const currentSlide = Math.floor(currentIndex / cardsPerView);
        
        if (currentSlide > 0) {
            currentIndex -= cardsPerView; // Move by 2 cards (or 1 on mobile)
            if (currentIndex < 0) {
                currentIndex = 0;
            }
            updateCarousel();
        }
    }
    
    function goToSlide(slideIndex) {
        if (isTransitioning) return;
        
        currentIndex = slideIndex * cardsPerView;
        const maxIndex = totalCards - cardsPerView;
        
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        updateCarousel();
    }
    
    // Handle window resize
    function handleResize() {
        const newCardsPerView = window.innerWidth <= 768 ? 1 : 2;
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentIndex = 0; // Reset to beginning
            
            // Recreate indicators
            const indicatorsContainer = document.querySelector('.carousel-indicators');
            if (indicatorsContainer) {
                const maxSlides = Math.ceil(totalCards / cardsPerView);
                indicatorsContainer.innerHTML = Array.from({length: maxSlides}, (_, i) => 
                    `<div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
                ).join('');
                
                // Re-bind indicator events
                const newIndicators = document.querySelectorAll('.indicator');
                newIndicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => goToSlide(index));
                });
            }
            
            updateCarousel();
        }
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    updateCarousel();
    
    // Auto-play functionality (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const maxSlides = Math.ceil(totalCards / cardsPerView);
            const currentSlide = Math.floor(currentIndex / cardsPerView);
            
            if (currentSlide >= maxSlides - 1) {
                currentIndex = 0;
            } else {
                nextSlide();
                return; // Let nextSlide handle the update
            }
            updateCarousel();
        }, 5000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Optional: Start autoplay
    // startAutoPlay();
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', () => {
        // Uncomment the line below if you want autoplay
        // startAutoPlay();
    });
}
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth <= 768 ? 1 : 2;
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            currentIndex = 0;
            updateCarousel();
            
            // Recreate indicators
            const indicatorContainer = document.querySelector('.carousel-indicators');
            if (indicatorContainer) {
                indicatorContainer.innerHTML = Array.from({length: Math.ceil(totalCards / cardsPerView)}, (_, i) => 
                    `<div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
                ).join('');
                
                // Re-attach indicator events
                document.querySelectorAll('.indicator').forEach((indicator, index) => {
                    indicator.addEventListener('click', () => goToSlide(index));
                });
            }
        }
    });
    
    // Pause auto-play on hover
    const carouselContainer = carousel.closest('.services-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Start auto-play after a delay
    setTimeout(startAutoPlay, 3000);
    
    console.log('Services carousel initialized with', totalCards, 'cards');


// ==========================================================================
// SMOOTH SCROLLING
// ==========================================================================
function initializeSmoothScrolling() {
    // Already handled in initializeInteractiveElements
    // This function exists for consistency with the initialization call
}

// ==========================================================================
// BACK TO TOP FUNCTIONALITY
// ==========================================================================
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial state
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all var(--transition-normal)';
}

// ==========================================================================
// SCROLL FUNCTIONALITY FOR HERO AND FOOTER BUTTONS
// ==========================================================================
function initializeScrollButtons() {
    // Hero scroll indicator
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Add cursor pointer style
        heroScrollIndicator.style.cursor = 'pointer';
    }
    
    // Additional enhancement for back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        // Add click event if not already present
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
