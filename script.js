// ===================================
// PERSONAL BIO PAGE - JAVASCRIPT
// Interactive & Responsive Functionality
// ===================================

// ===================================
// 1. THEME TOGGLE (Dark/Light Mode)
// ===================================
/*const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon();

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});*/

// ===================================
// 2. MOBILE NAVIGATION
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// 3. SMOOTH SCROLLING & ACTIVE NAV
// ===================================
// Update active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===================================
// 4. STICKY NAVBAR ON SCROLL
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// 5. ANIMATED COUNTERS (Stats)
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

function animateCounters() {
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;
    
    const statsSectionTop = statsSection.offsetTop;
    const scrollY = window.pageYOffset;
    
    if (scrollY + window.innerHeight > statsSectionTop && !counted) {
        counted = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ===================================
// 6. SKILL BARS ANIMATION
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    const skillsSectionTop = skillsSection.offsetTop;
    const scrollY = window.pageYOffset;
    
    if (scrollY + window.innerHeight > skillsSectionTop + 200 && !skillsAnimated) {
        skillsAnimated = true;
        
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 300);
        });
    }
}

window.addEventListener('scroll', animateSkills);

// ===================================
// 7. SCROLL REVEAL ANIMATIONS
// ===================================
const revealElements = document.querySelectorAll('.project-card, .highlight-card, .skill-category');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in-up');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===================================
// 8. BACK TO TOP BUTTON
// ===================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// 9. CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate sending (replace with actual API call)
    setTimeout(() => {
        // Success
        showFormMessage('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // In real implementation, you would do:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showFormMessage('✅ Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showFormMessage('❌ Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showFormMessage('❌ Network error. Please try again.', 'error');
        }
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        */
    }, 2000);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===================================
// 10. TYPING EFFECT (Hero Section)
// ===================================
const textSlider = document.querySelector('.text-slider');
if (textSlider) {
    const texts = [
        'Frontend Developer',
        'UI/UX Enthusiast',
        'Creative Coder',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textSlider.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            textSlider.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(typeText, 1000);
}

// ===================================
// 11. CURSOR BLINK ANIMATION
// ===================================
const typingCursor = document.querySelector('.typing-cursor');
if (typingCursor) {
    setInterval(() => {
        typingCursor.style.opacity = typingCursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}

// ===================================
// 12. PARALLAX EFFECT (Hero Particles)
// ===================================
const heroParticles = document.querySelector('.hero-particles');

window.addEventListener('mousemove', (e) => {
    if (!heroParticles) return;
    
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    heroParticles.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ===================================
// 13. PROJECT CARD TILT EFFECT
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===================================
// 14. LAZY LOADING IMAGES
// ===================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// 15. KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPrevSection(currentSection);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    let current = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
        }
    });
    return current;
}

function getNextSection(current) {
    if (!current) return sections[0];
    const allSections = Array.from(sections);
    const currentIndex = allSections.indexOf(current);
    return allSections[currentIndex + 1] || null;
}

function getPrevSection(current) {
    if (!current) return null;
    const allSections = Array.from(sections);
    const currentIndex = allSections.indexOf(current);
    return allSections[currentIndex - 1] || null;
}

// ===================================
// 16. PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    updateActiveNav();
    animateCounters();
    animateSkills();
    revealOnScroll();
}, 10));

// ===================================
// 17. ACCESSIBILITY IMPROVEMENTS
// ===================================
// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// 18. CONSOLE MESSAGE
// ===================================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #6b7280;');
console.log('%cInterested in the code? Check out the repo on GitHub!', 'font-size: 14px; color: #6b7280;');
console.log('%c', 'font-size: 1px;');
console.log('%cWebsite built with ❤️ by Nancy Okafor', 'font-size: 12px; color: #6366f1;');

// ===================================
// 19. INITIALIZE ON PAGE LOAD
// ===================================
window.addEventListener('load', () => {
    console.log('✅ Personal Bio Page Loaded Successfully!');
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initial animations
    revealOnScroll();
    
    // Log visitor info (for analytics)
    console.log('Screen Resolution:', window.screen.width, 'x', window.screen.height);
    console.log('Viewport Size:', window.innerWidth, 'x', window.innerHeight);
    console.log('Theme:', html.getAttribute('data-theme'));
});

// ===================================
// 20. UTILITY FUNCTIONS
// ===================================
// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
    });
}

// Export functions for external use
window.bioPage = {
    scrollToSection,
    copyToClipboard,
    showFormMessage
};
