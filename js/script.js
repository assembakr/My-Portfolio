// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const showToastBtn = document.getElementById('showToast');
const contactForm = document.getElementById('contactForm');
const submitSpinner = document.getElementById('submitSpinner');

// Theme Toggle Functionality
let isDark = false;
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    isDark = true;
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Back to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form Validation and Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.checkValidity()) {
        // Show loading spinner
        submitSpinner.classList.remove('d-none');
        
        // Simulate form submission
        setTimeout(() => {
            submitSpinner.classList.add('d-none');
            showSuccessToast();
            this.reset();
            this.classList.remove('was-validated');
        }, 2000);
    }

    this.classList.add('was-validated');
});

// Toast Notification
function showSuccessToast() {
    const toast = new bootstrap.Toast(document.getElementById('successToast'));
    toast.show();
}

// Show toast button functionality
showToastBtn.addEventListener('click', showSuccessToast);

// Initialize Bootstrap Components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };

    // Trigger progress bar animation on scroll
    window.addEventListener('scroll', animateProgressBars);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, section > .container > .row').forEach(el => {
    observer.observe(el);
});

// Modal form submission
document.querySelector('#contactModal .btn-primary').addEventListener('click', function() {
    const modalName = document.getElementById('modalName').value;
    const modalEmail = document.getElementById('modalEmail').value;
    const modalMessage = document.getElementById('modalMessage').value;
    
    if (modalName && modalEmail && modalMessage) {
        showSuccessToast();
        bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
        // Reset modal form
        document.querySelector('#contactModal form').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            themeToggle.click();
        }
    }
    
    // Press 'Escape' to close modals and offcanvas
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            bootstrap.Modal.getInstance(openModal).hide();
        }
        
        const openOffcanvas = document.querySelector('.offcanvas.show');
        if (openOffcanvas) {
            bootstrap.Offcanvas.getInstance(openOffcanvas).hide();
        }
    }
});

// Carousel auto-pause on hover
const carousel = document.getElementById('projectCarousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        bootstrap.Carousel.getInstance(carousel).pause();
    });
    
    carousel.addEventListener('mouseleave', () => {
        bootstrap.Carousel.getInstance(carousel).cycle();
    });
}

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.querySelectorAll('footer').forEach(footer => {
    footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
});

// Contact cards hover effect
document.querySelectorAll('#contact .card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills animation trigger
const skillsSection = document.getElementById('about');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            // Trigger progress bar animations
            setTimeout(() => {
                document.querySelectorAll('#about .progress-bar').forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('style').match(/width:\s*(\d+%)/)[1];
                    }, index * 200);
                });
            }, 500);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Copy email to clipboard
document.querySelectorAll('[href="mailto:john.doe@example.com"]').forEach(emailLink => {
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        navigator.clipboard.writeText('john.doe@example.com').then(() => {
            showSuccessToast();
        });
    });
});

// Loading screen (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add entrance animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }, 200);
});





