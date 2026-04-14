const bookingForm = document.querySelector('#booking-form');
const formMessage = document.querySelector('#form-message');
const yearNode = document.querySelector('#year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const fullName = String(formData.get('fullName') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const checkIn = String(formData.get('checkIn') || '');
    const checkOut = String(formData.get('checkOut') || '');
    const guests = String(formData.get('guests') || '');
    const roomType = String(formData.get('roomType') || '');

    if (!fullName || !phone || !checkIn || !checkOut || !guests || !roomType) {
      formMessage.textContent = 'Please complete all required fields.';
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      formMessage.textContent = 'Check-out date must be after check-in date.';
      return;
    }

    formMessage.textContent = 'Thank you. Your inquiry has been received. We will contact you shortly.';
    bookingForm.reset();
  });
}
