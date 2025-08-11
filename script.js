document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  let isValid = true;

  // Reset error messages
  nameError.style.display = 'none';
  emailError.style.display = 'none';
  messageError.style.display = 'none';

  // Validate inputs
  if (!name) {
    nameError.style.display = 'block';
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.style.display = 'block';
    isValid = false;
  }

  if (!message) {
    messageError.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    alert('Form submitted successfully!');
    this.reset();
  }
});

// ...existing code...
window.addEventListener('scroll', function() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('blur');
  } else {
    nav.classList.remove('blur');
  }
});

