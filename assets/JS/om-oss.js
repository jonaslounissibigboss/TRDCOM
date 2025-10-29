// om-oss.js - Script for the Om Oss page

// Constants
const COMPONENTS_PATH = 'components/';
const TRANSITION_DURATION = 300;

// Component loading configuration
const componentsToLoad = [
    { file: 'header-om-oss.html', selector: 'header' },
    { file: 'footer-product.html', selector: 'footer' }
];

// Load component function
async function loadComponent(file, selector) {
    try {
        const response = await fetch(`${COMPONENTS_PATH}${file}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }
        const html = await response.text();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading component ${file}:`, error);
    }
}

// Load all components
async function loadAllComponents() {
    const promises = componentsToLoad.map(({ file, selector }) => 
        loadComponent(file, selector)
    );
    await Promise.all(promises);
}

// Initialize logo intro animation
function initLogoIntro() {
    const overlay = document.getElementById('logo-intro-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Update navigation to highlight current page
function updateNavigation() {
    // Wait for header to load
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            // Remove active class from home links
            if (link.getAttribute('data-section') === 'hero' || link.getAttribute('href') === '#hero') {
                link.classList.remove('active');
            }
            // Add active class to Om Oss link
            if (link.getAttribute('href') === 'om-oss.html') {
                link.classList.add('active');
            }
        });
    }, 100);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;
    
    if (!menuToggle || !mobileMenu || !mobileMenuOverlay) return;

    let isMenuOpen = false;

    // Function to open mobile menu
    function openMobileMenu() {
        isMenuOpen = true;
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('mobile-menu-open');
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('mobile-menu-open');
    }

    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when close button is clicked
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
        });
    }

    // Close menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close mobile menu when clicking on a navigation link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });

    // Prevent menu from staying open on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize logo intro
    initLogoIntro();
    
    // Load all components
    await loadAllComponents();
    
    // Update navigation
    updateNavigation();
    
    // Initialize mobile menu after components are loaded
    setTimeout(() => {
        initMobileMenu();
        initBackToTop();
    }, 100);
});