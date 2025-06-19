// DevBook-inspired JavaScript for AI eBook Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeForm();
    initializeWhatsAppMask();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeParallaxEffects();
});

// Form functionality with enhanced validation
function initializeForm() {
    const form = document.getElementById('preVendaForm');
    const submitButton = form.querySelector('.submit-button');
    const buttonLoader = submitButton.querySelector('.button-loader');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation states
        clearValidationStates();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            showLoadingState(submitButton, buttonLoader);
            
            // Simulate form submission with realistic delay
            setTimeout(() => {
                // Hide loading state
                hideLoadingState(submitButton, buttonLoader);
                
                // Show success modal with enhanced animation
                showSuccessModal();
                
                // Reset form
                form.reset();
                clearValidationStates();
                
                // Track conversion (placeholder for analytics)
                trackConversion();
                
            }, 2000); // Slightly longer delay for realism
        }
    });
    
    // Real-time validation
    const fields = form.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateForm() {
    const nomeCompleto = document.getElementById('nomeCompleto');
    const email = document.getElementById('email');
    const whatsapp = document.getElementById('whatsapp');
    
    let isValid = true;
    
    // Validate nome completo
    if (!validateField(nomeCompleto)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateField(email)) {
        isValid = false;
    }
    
    // Validate WhatsApp
    if (!validateField(whatsapp)) {
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const fieldType = field.type;
    const fieldId = field.id;
    const value = field.value.trim();
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldId) {
        case 'nomeCompleto':
            if (!value) {
                isValid = false;
                errorMessage = 'Por favor, informe seu nome completo.';
            } else if (value.split(' ').length < 2) {
                isValid = false;
                errorMessage = 'Por favor, informe seu nome completo (nome e sobrenome).';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 3 caracteres.';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'Por favor, informe seu e-mail.';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Por favor, informe um e-mail válido.';
            }
            break;
            
        case 'whatsapp':
            if (!value) {
                isValid = false;
                errorMessage = 'Por favor, informe seu número do WhatsApp.';
            } else if (!isValidWhatsApp(value)) {
                isValid = false;
                errorMessage = 'Por favor, informe um número de WhatsApp válido.';
            }
            break;
    }
    
    if (isValid) {
        showFieldSuccess(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
        feedback.style.display = 'block';
    }
    
    // Add shake animation
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function showFieldSuccess(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.style.display = 'none';
    }
}

function clearValidationStates() {
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.classList.remove('is-invalid', 'is-valid');
        const feedback = field.parentNode.querySelector('.invalid-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidWhatsApp(phone) {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it has 10 or 11 digits (Brazilian format)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

function showLoadingState(button, loader) {
    button.disabled = true;
    button.style.opacity = '0.8';
    loader.classList.remove('d-none');
    
    // Hide the icon temporarily
    const icon = button.querySelector('i');
    if (icon) {
        icon.style.display = 'none';
    }
}

function hideLoadingState(button, loader) {
    button.disabled = false;
    button.style.opacity = '1';
    loader.classList.add('d-none');
    
    // Show the icon again
    const icon = button.querySelector('i');
    if (icon) {
        icon.style.display = 'inline';
    }
}

function showSuccessModal() {
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
    
    // Add celebration effects
    addCelebrationEffect();
    
    // Play success sound (if available)
    playSuccessSound();
}

function addCelebrationEffect() {
    // Create confetti effect
    createConfetti();
    
    // Add pulse effect to success icon
    setTimeout(() => {
        const successIcon = document.querySelector('.success-icon');
        if (successIcon) {
            successIcon.style.animation = 'pulse 1s ease-in-out 3';
        }
    }, 300);
}

function createConfetti() {
    const colors = ['#ed6524', '#667eea', '#764ba2', '#198754', '#ffc107'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: 50%;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        if (document.body.contains(confettiContainer)) {
            document.body.removeChild(confettiContainer);
        }
    }, 5000);
}

function playSuccessSound() {
    // Create a simple success sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        // Silently fail if Web Audio API is not supported
        console.log('Audio not supported');
    }
}

function initializeSmoothScrolling() {
    // Handle smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeWhatsAppMask() {
    const whatsappField = document.getElementById('whatsapp');
    
    whatsappField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        
        // Apply Brazilian phone mask
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
    
    // Handle backspace and delete keys
    whatsappField.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            // Allow normal backspace behavior
            return;
        }
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for feature items
                if (entry.target.classList.contains('feature-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-item, .form-container, .section-heading');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    const bookCover = document.querySelector('.book-cover');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Subtle parallax for book cover
        if (bookCover) {
            const bookRate = scrolled * -0.2;
            bookCover.style.transform = `translateY(${bookRate}px)`;
        }
    });
}

function trackConversion() {
    // Placeholder for analytics tracking
    console.log('Conversion tracked: eBook pre-sale signup');
    
    // Example: Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'event_category': 'eBook',
            'event_label': 'Pre-sale Signup',
            'value': 1
        });
    }
    
    // Example: Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'IA eBook Pre-sale',
            content_category: 'eBook'
        });
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
        if (modal) {
            modal.hide();
        }
    }
    
    // Submit form with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        const form = document.getElementById('preVendaForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Auto-save form data to localStorage
function initializeAutoSave() {
    const form = document.getElementById('preVendaForm');
    const fields = form.querySelectorAll('input');
    
    // Load saved data
    fields.forEach(field => {
        const savedValue = localStorage.getItem(`ebook_devbook_${field.id}`);
        if (savedValue) {
            field.value = savedValue;
        }
    });
    
    // Save data on input
    fields.forEach(field => {
        field.addEventListener('input', function() {
            localStorage.setItem(`ebook_devbook_${field.id}`, field.value);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        fields.forEach(field => {
            localStorage.removeItem(`ebook_devbook_${field.id}`);
        });
    });
}

// Initialize auto-save feature
document.addEventListener('DOMContentLoaded', function() {
    initializeAutoSave();
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    // Scroll-based animations and effects
}, 16)); // ~60fps

