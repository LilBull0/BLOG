// ===== GLOBAL STATE =====
let currentLanguage = 'fr';
let currentSlide = 0;
const translations = {
    fr: {},
    en: {}
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
    initNavigation();
    initCarousel();
    initAnimations();
});

// ===== LANGUAGE SWITCHER =====
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-fr]').forEach(element => {
        const frText = element.getAttribute('data-fr');
        const enText = element.getAttribute('data-en');
        const text = lang === 'fr' ? frText : enText;
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-fr]').forEach(element => {
        const frPlaceholder = element.getAttribute('data-placeholder-fr');
        const enPlaceholder = element.getAttribute('data-placeholder-en');
        element.placeholder = lang === 'fr' ? frPlaceholder : enPlaceholder;
    });
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

function initLanguageSwitcher() {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
    changeLanguage(savedLang);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// ===== CAROUSEL =====
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Auto-play carousel
    setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function moveCarousel(direction) {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track) return;
    
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Update carousel on window resize
window.addEventListener('resize', updateCarousel);

// ===== CONTACT FORM =====
function handleSubmit() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = document.getElementById('subject').value;
    
    // Basic validation
    if (!name || !email || !message || !subject) {
        alert(currentLanguage === 'fr' 
            ? 'Veuillez remplir tous les champs obligatoires.' 
            : 'Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert(currentLanguage === 'fr' 
            ? 'Veuillez entrer une adresse email valide.' 
            : 'Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    console.log('Form submitted:', {
        name,
        email,
        phone: document.getElementById('phone').value,
        subject,
        message,
        newsletter: document.getElementById('newsletter').checked
    });
    
    // Show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Reset form
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type === 'checkbox') {
            field.checked = false;
        } else {
            field.value = '';
        }
    });
    
    // Show form, hide success message
    successMessage.style.display = 'none';
    form.style.display = 'block';
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-item, .blog-card, .value-card, .grid-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        const scrolled = window.pageYOffset;
        const parallaxContent = parallaxSection.querySelector('.parallax-content');
        if (parallaxContent) {
            parallaxContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler
const handleResize = debounce(() => {
    updateCarousel();
}, 250);

window.addEventListener('resize', handleResize);

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ACCESSIBILITY =====
// Add keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (document.querySelector('.carousel-track')) {
        if (e.key === 'ArrowLeft') {
            moveCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            moveCarousel(1);
        }
    }
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c✨ Blog Créatif ✨', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cSite web créé avec passion', 'font-size: 14px; color: #64748b;');
