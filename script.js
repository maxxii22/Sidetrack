const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });
}

const bookingForm = document.getElementById('booking-form');
const formFeedback = document.getElementById('form-feedback');
const claimOfferButton = document.getElementById('claim-offer');
const offerField = document.getElementById('offer-field');

if (claimOfferButton && offerField) {
  claimOfferButton.addEventListener('click', () => {
    offerField.value = 'Up to 15% off selected stays';
    formFeedback.textContent = 'Offer applied. Complete your booking inquiry below.';
    formFeedback.classList.remove('error');
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (bookingForm && formFeedback) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const checkin = new Date(String(formData.get('checkin')));
    const checkout = new Date(String(formData.get('checkout')));

    if (!bookingForm.checkValidity()) {
      formFeedback.textContent = 'Please complete all required fields correctly.';
      formFeedback.classList.add('error');
      bookingForm.reportValidity();
      return;
    }

    if (checkout <= checkin) {
      formFeedback.textContent = 'Check-out date must be after check-in date.';
      formFeedback.classList.add('error');
      return;
    }

    const message = [
      'Hello Light Spring Hotel, I would like to make a booking inquiry.',
      `Name: ${formData.get('fullName')}`,
      `Phone: ${formData.get('phone')}`,
      `Email: ${formData.get('email')}`,
      `Check-in: ${formData.get('checkin')}`,
      `Check-out: ${formData.get('checkout')}`,
      `Guests: ${formData.get('guests')}`,
      `Room Type: ${formData.get('roomType')}`,
      `Offer: ${formData.get('offer') || 'None'}`,
      `Notes: ${formData.get('message') || 'None'}`,
    ].join('\n');

    formFeedback.textContent = 'Inquiry ready. We are opening WhatsApp so you can send it instantly.';
    formFeedback.classList.remove('error');

    const whatsappUrl = `https://wa.me/2348118620454?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}
