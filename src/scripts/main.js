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
            // Re-initialize interactive elements after components load
            initializeInteractiveElements();
            // Re-initialize form handling after contact component loads
            initializeFormHandling();
            // Re-initialize scroll buttons after components load
            initializeScrollButtons();
            
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
                            <a href="#about" class="btn btn-primary">Les Mer</a>
                            <a href="#contact" class="btn btn-secondary">Kontakt Oss</a>
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
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    console.log('Initializing form handling for contact form');
    
    // Remove inline onsubmit handler
    contactForm.onsubmit = null;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const formData = new FormData(contactForm);
        
        // Store original button text
        const originalBtnText = submitBtn.innerHTML;
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Sender...';
        
        try {
            // Send email via API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success feedback
                showNotification('Takk for meldingen! Vi kommer tilbake til deg snart.', 'success');
                contactForm.reset();
                
                // Reset form field labels
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    const input = group.querySelector('input, textarea');
                    const label = group.querySelector('label');
                    if (input && label) {
                        label.style.top = '1rem';
                        label.style.fontSize = '0.9rem';
                        label.style.color = 'var(--ferrari-gray-lighter)';
                    }
                });
            } else {
                throw new Error(result.message || 'Kunne ikke sende melding');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Det oppstod en feil. Vennligst prøv igjen senere eller kontakt oss direkte.', 'error');
        } finally {
            // Restore button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
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

// Old showNotification removed - using the new one with progress bar

// ==========================================================================
// ENHANCED REVIEW ANIMATIONS & CAROUSEL
// ==========================================================================
function initializeEnhancedReviewAnimations() {
    const reviewCarousel = document.getElementById('reviewsCarousel');
    
    if (!reviewCarousel) {
        console.log('Reviews carousel not found');
        return;
    }
    
    const reviewCards = reviewCarousel.querySelectorAll('.review-card');
    const indicators = document.querySelectorAll('#reviewsIndicators .indicator');
    const prevBtn = document.querySelector('.reviews-section .carousel-btn.prev');
    const nextBtn = document.querySelector('.reviews-section .carousel-btn.next');
    
    let currentIndex = 0;
    let autoScrollInterval;
    let isTransitioning = false;
    const totalReviews = reviewCards.length;
    const AUTO_SCROLL_DELAY = 5000; // 5 seconds
    
    // Initialize first review as active
    if (reviewCards.length > 0) {
        reviewCards[0].classList.add('active');
    }
    
    function updateReviewCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Update review visibility
        reviewCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Update carousel transform
        reviewCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalReviews - 1;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    function nextReview() {
        if (currentIndex < totalReviews - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to first
        }
        updateReviewCarousel();
        resetAutoScroll();
    }
    
    function prevReview() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalReviews - 1; // Loop to last
        }
        updateReviewCarousel();
        resetAutoScroll();
    }
    
    function goToReview(index) {
        if (index >= 0 && index < totalReviews) {
            currentIndex = index;
            updateReviewCarousel();
            resetAutoScroll();
        }
    }
    
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(nextReview, AUTO_SCROLL_DELAY);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevReview);
    if (nextBtn) nextBtn.addEventListener('click', nextReview);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToReview(index));
    });
    
    // Pause auto-scroll on hover
    reviewCarousel.addEventListener('mouseenter', stopAutoScroll);
    reviewCarousel.addEventListener('mouseleave', startAutoScroll);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    reviewCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoScroll();
    });
    
    reviewCarousel.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });
    
    reviewCarousel.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                nextReview();
            } else {
                prevReview();
            }
        }
        startAutoScroll();
    });
    
    // Add star animations to all cards
    reviewCards.forEach((card) => {
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
    
    // Initialize carousel
    updateReviewCarousel();
    
    // Start auto-scroll after a delay
    setTimeout(startAutoScroll, 2000);
    
    console.log('Reviews carousel initialized with', totalReviews, 'reviews');
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
    
    // Add click functionality to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const service = card.getAttribute('data-service');
            let targetPage = '';
            
            switch(service) {
                case 'kommaersj-utvikling':
                    targetPage = 'kommaersj-utvikling.html';
                    break;
                case 'mentoring':
                    targetPage = 'mentoring.html';
                    break;
                case 'community':
                    targetPage = 'trd-commercial-hub.html';
                    break;
                case 'for-hire':
                    targetPage = 'kommaersj-for-hire.html';
                    break;
                default:
                    targetPage = '#services';
            }
            
            // Navigate to the corresponding page
            window.location.href = targetPage;
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
    
    // Mobile-specific auto-scroll functionality
    let hoverTimeout;
    let isHovering = false;
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Auto-scroll when hovering too long on mobile
    carousel.addEventListener('mouseenter', (e) => {
        if (isMobile()) {
            stopAutoPlay();
            isHovering = true;
            
            // Start timer for auto-scroll after 3 seconds of hovering
            hoverTimeout = setTimeout(() => {
                if (isHovering) {
                    nextSlide();
                }
            }, 3000);
        } else {
            stopAutoPlay();
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
        clearTimeout(hoverTimeout);
        
        if (isMobile()) {
            startAutoPlay();
        }
    });
    
    // Start autoplay on mobile
    if (isMobile()) {
        setTimeout(() => {
            startAutoPlay();
        }, 2000);
    }
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
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('Back to top button initialized');
}

// ==========================================================================
// NOTIFICATION SYSTEM
// ==========================================================================
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Lukk varsling">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="notification-progress">
            <div class="notification-progress-bar"></div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Get elements
    const closeBtn = notification.querySelector('.notification-close');
    const progressBar = notification.querySelector('.notification-progress-bar');
    
    // Animation timing
    const duration = 5000; // 5 seconds
    let startTime = null;
    let animationId = null;
    
    // Progress animation
    function animateProgress(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        progressBar.style.width = `${100 - progress}%`;
        
        if (progress < 100) {
            animationId = requestAnimationFrame(animateProgress);
        } else {
            closeNotification();
        }
    }
    
    // Close notification function
    function closeNotification() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        notification.classList.add('hiding');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    // Close button click handler
    closeBtn.addEventListener('click', closeNotification);
    
    // Start animation after a brief delay
    setTimeout(() => {
        notification.classList.add('show');
        requestAnimationFrame(animateProgress);
    }, 100);
}

// ==========================================================================
// SCROLL FUNCTIONALITY FOR HERO AND FOOTER BUTTONS
// ==========================================================================
function initializeScrollButtons() {
    // Hero scroll indicator
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    console.log('Hero scroll indicator found:', !!heroScrollIndicator);
    
    if (heroScrollIndicator) {
        heroScrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Hero scroll indicator clicked!');
            
            const aboutSection = document.querySelector('#about');
            console.log('About section found:', !!aboutSection);
            
            if (aboutSection) {
                console.log('Scrolling to about section...');
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback: scroll down by viewport height
                window.scrollBy({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add cursor pointer style
        heroScrollIndicator.style.cursor = 'pointer';
        console.log('Hero scroll indicator initialized successfully');
    } else {
        console.warn('Hero scroll indicator not found');
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
