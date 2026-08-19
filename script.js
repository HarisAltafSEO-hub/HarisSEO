/* ========== MOBILE MENU TOGGLE ========== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

/* ========== COUNTER ANIMATION ========== */
const counters = document.querySelectorAll('.counter');
const speed = 150;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            updateCount();
        }
    });
    observer.observe(counter);
});

/* ========== 8D DYNAMIC MOUSE TILT EFFECT ========== */
// This attaches the interactive 3D WebGL feel to all your cards
const tiltCards = document.querySelectorAll('.js-tilt');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to center of the card
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt angles (multiplier controls the depth intensity)
        const tiltX = ((y - centerY) / centerY) * -10; 
        const tiltY = ((x - centerX) / centerX) * 10;
        
        // Apply 3D Transform
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `0 30px 60px rgba(4, 57, 107, 0.15)`;
    });

    // Reset card when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.boxShadow = `0 4px 6px -1px rgba(0, 0, 0, 0.05)`;
        card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease';
    });
    
    // Remove transition when hovering so tracking is instant and smooth
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; 
    });
});

/* ========== CONTACT FORM SUBMISSION ========== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:harisaltaf123450@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;

        alert('Thank you! Your email client will open shortly.');
        contactForm.reset();
    });
}
