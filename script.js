// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('-rotate-45');
    });
}

// Update Current Year in Footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset previous errors
        const errorElements = form.querySelectorAll('.form-error');
        errorElements.forEach(error => error.remove());
        
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            input.classList.remove('error');
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            }
            
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    showError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(input.value)) {
                    showError(input, 'Please enter a valid 10-digit phone number');
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Show success message
            const alert = createAlert('success', 'Form submitted successfully!');
            form.insertBefore(alert, form.firstChild);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                alert.remove();
            }, 2000);
        }
    });
});

function showError(input, message) {
    input.classList.add('error');
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    input.parentNode.appendChild(error);
}

function createAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    const icon = document.createElement('div');
    icon.className = 'alert-icon';
    icon.innerHTML = type === 'success' 
        ? '<img src="https://api.iconify.design/lucide:check-circle.svg?color=%23065f46" alt="" width="20" height="20">'
        : '<img src="https://api.iconify.design/lucide:alert-circle.svg?color=%23991b1b" alt="" width="20" height="20">';
    
    const content = document.createElement('div');
    content.className = 'alert-content';
    content.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'alert-close';
    closeBtn.innerHTML = '<img src="https://api.iconify.design/lucide:x.svg" alt="Close" width="16" height="16">';
    closeBtn.onclick = () => alert.remove();
    
    alert.appendChild(icon);
    alert.appendChild(content);
    alert.appendChild(closeBtn);
    
    return alert;
}

// Blood Inventory Chart Animation
const bloodBars = document.querySelectorAll('.bar');
if (bloodBars.length) {
    bloodBars.forEach(bar => {
        const height = bar.dataset.level || '0';
        setTimeout(() => {
            bar.style.height = `${height}%`;
        }, 100);
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});