// ================================
// VARIABLES & INITIALIZATION
// ================================

let particlesCanvas, particlesCtx;
let particles = [];
let animationId;
let mouseX = 0, mouseY = 0;
let isMouseMoving = false;

// ================================
// PARTICLE SYSTEM
// ================================

class Particle {
    constructor() {
        this.reset();
        this.life = Math.random();
    }
    
    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
        this.size = Math.random() * 3 + 1;
    }
    
    update() {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150 && isMouseMoving) {
            const force = (150 - distance) / 150;
            this.vx += dx * force * 0.0003;
            this.vy += dy * force * 0.0003;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        // Boundaries
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;
        
        if (this.life <= 0) {
            this.reset();
        }
    }
    
    draw() {
        particlesCtx.save();
        particlesCtx.globalAlpha = this.life * 0.6;
        
        // Create gradient
        const gradient = particlesCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, '#00d4ff');
        gradient.addColorStop(0.5, '#0066ff');
        gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');
        
        particlesCtx.fillStyle = gradient;
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particlesCtx.fill();
        
        particlesCtx.restore();
    }
}

function initParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    particlesCtx = particlesCanvas.getContext('2d');
    
    resizeCanvas();
    
    // Create particles
    const particleCount = Math.min(150, Math.floor(window.innerWidth / 10));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    animateParticles();
}

function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    // Draw connections
    drawConnections();
    
    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    animationId = requestAnimationFrame(animateParticles);
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const opacity = (100 - distance) / 100 * 0.2 * particles[i].life * particles[j].life;
                
                particlesCtx.save();
                particlesCtx.globalAlpha = opacity;
                particlesCtx.strokeStyle = '#00d4ff';
                particlesCtx.lineWidth = 1;
                particlesCtx.beginPath();
                particlesCtx.moveTo(particles[i].x, particles[i].y);
                particlesCtx.lineTo(particles[j].x, particles[j].y);
                particlesCtx.stroke();
                particlesCtx.restore();
            }
        }
    }
}

// ================================
// NAVIGATION
// ================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollY = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ================================
// SMOOTH SCROLLING
// ================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ================================
// INTERSECTION OBSERVER
// ================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Add animation class
                if (entry.target.classList.contains('service-card')) {
                    const parent = entry.target.parentElement;
                    if (parent && parent.children) {
                        const siblings = Array.from(parent.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .stat-item, .about-text, .contact-item');
    if (animatedElements && animatedElements.length > 0) {
        animatedElements.forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(el);
            }
        });
    }
}

// ================================
// COUNTER ANIMATION
// ================================

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ================================
// FORM HANDLING
// ================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Form validation and styling
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form);
        }
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const isRequired = input.required;
    
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (value) {
        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Digite um email válido';
                }
                break;
            case 'tel':
                const phoneRegex = /^[\d\s\-\(\)\+]+$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Digite um telefone válido';
                }
                break;
        }
    }
    
    // Style input based on validation
    if (!isValid) {
        input.style.borderBottomColor = '#ff4757';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff4757';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = errorMessage;
        input.parentElement.appendChild(errorDiv);
    } else {
        input.style.borderBottomColor = value ? '#00d4ff' : 'rgba(148, 163, 184, 0.3)';
    }
    
    return isValid;
}

function submitForm(form) {
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Enviando...';
    submitBtn.style.opacity = '0.7';
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.style.opacity = '1';
        
        // Remove focused states
        const focusedGroups = form.querySelectorAll('.form-group.focused');
        focusedGroups.forEach(group => group.classList.remove('focused'));
        
        console.log('Dados do formulário:', data);
    }, 2000);
}

// ================================
// NOTIFICATION SYSTEM
// ================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#0066ff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 300px;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ================================
// SERVICE CARDS INTERACTION
// ================================

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });
}

// ================================
// MOUSE TRACKING
// ================================

function initMouseTracking() {
    let mouseMoveTimeout;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
        
        // Update CSS custom properties for cursor effects
        document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
        document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });
}

// ================================
// PERFORMANCE OPTIMIZATION
// ================================

function initPerformanceOptimization() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Add scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Intersection observer for lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ================================
// KEYBOARD ACCESSIBILITY
// ================================

function initKeyboardAccessibility() {
    // Tab navigation enhancement
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #00d4ff';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// ================================
// LOADING ANIMATIONS
// ================================

function initLoadingAnimations() {
    // Page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-line, .hero-subtitle, .hero-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    });
}

// ================================
// TOUCH DEVICE OPTIMIZATIONS
// ================================

function initTouchOptimizations() {
    // Detect touch device
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Optimize hover effects for touch
        const hoverElements = document.querySelectorAll('.service-card, .project-card, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 200);
            });
        });
    }
}

// ================================
// RESIZE HANDLER
// ================================

function handleResize() {
    resizeCanvas();
    
    // Adjust particle count based on screen size
    const newParticleCount = Math.min(150, Math.floor(window.innerWidth / 10));
    
    if (particles.length !== newParticleCount) {
        particles.length = 0; // Clear array
        for (let i = 0; i < newParticleCount; i++) {
            particles.push(new Particle());
        }
    }
}

// ================================
// MAIN INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initParticles();
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initServiceCards();
    initMouseTracking();
    initPerformanceOptimization();
    initKeyboardAccessibility();
    initLoadingAnimations();
    initTouchOptimizations();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Add some CSS classes for enhanced styling
    document.body.classList.add('js-enabled');
    
    console.log('HR Comércio - Site carregado com sucesso! 🚀');
});

// ================================
// UTILITY FUNCTIONS
// ================================

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Random utility functions
function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Color utilities
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Export functions for potential external use
window.hrComercio = {
    scrollToSection,
    showNotification,
    particles
};