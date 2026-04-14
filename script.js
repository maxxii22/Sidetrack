const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('main section, footer#contact');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const setActiveSection = () => {
  let active = 'home';
  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) {
      active = section.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute('data-section');
    link.classList.toggle('active', target === active);
  });
};

window.addEventListener('scroll', setActiveSection, { passive: true });
setActiveSection();

const revealables = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealables.forEach((el) => observer.observe(el));

const bookingForm = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');

if (bookingForm && formStatus) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.className = 'form-status';

    const formData = new FormData(bookingForm);
    const checkin = formData.get('checkin');
    const checkout = formData.get('checkout');
    const guests = formData.get('guests');
    const room = formData.get('room');

    if (!checkin || !checkout || !guests || !room) {
      formStatus.textContent = 'Please complete all fields before checking availability.';
      formStatus.classList.add('error');
      return;
    }

    const checkinDate = new Date(String(checkin));
    const checkoutDate = new Date(String(checkout));
    if (checkoutDate <= checkinDate) {
      formStatus.textContent = 'Check-out date must be after check-in date.';
      formStatus.classList.add('error');
      return;
    }

    const message = `Hello Light Spring Hotel, I would like to reserve a ${room} for ${guests}. Check-in: ${checkin}, Check-out: ${checkout}.`;
    const whatsappUrl = `https://wa.me/2348118620454?text=${encodeURIComponent(message)}`;

    formStatus.textContent = 'Great! Availability request prepared. Redirecting to WhatsApp...';
    formStatus.classList.add('success');

    window.setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener');
    }, 500);
  });
}
