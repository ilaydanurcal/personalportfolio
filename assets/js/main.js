/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link');
    } else {
      sectionsClass.classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200,
  // reset: true
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const indicators = document.querySelectorAll('.indicator');
  let currentProject = 0;

  function updateSlide() {
    slides.style.transform = `translateX(-${currentProject * 100}%)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentProject);
    });
  }

  function setProject(index) {
    currentProject = index;
    updateSlide();
  }

  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      setProject(parseInt(indicator.dataset.index));
    });
  });

  setInterval(() => {
    currentProject = (currentProject + 1) % indicators.length;
    updateSlide();
  }, 5000); // 5 saniyede bir otomatik geçiş
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {
  delay: 400,
});
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

/*===== FORM VALIDATION =====*/
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  contactForm.addEventListener('submit', function (e) {
    let isValid = true;

    // İsim alanını kontrol et
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Bu alan boş bırakılamaz.';
      nameError.style.display = 'block';
      nameInput.classList.add('error');
      isValid = false;
    } else {
      nameError.textContent = '';
      nameError.style.display = 'none';
      nameInput.classList.remove('error');
    }

    // E-posta alanını kontrol et
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Bu alan boş bırakılamaz.';
      emailError.style.display = 'block';
      emailInput.classList.add('error');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Geçerli bir e-posta adresi giriniz.';
      emailError.style.display = 'block';
      emailInput.classList.add('error');
      isValid = false;
    } else {
      emailError.textContent = '';
      emailError.style.display = 'none';
      emailInput.classList.remove('error');
    }

    // Mesaj alanını kontrol et
    if (messageInput.value.trim() === '') {
      messageError.textContent = 'Bu alan boş bırakılamaz.';
      messageError.style.display = 'block';
      messageInput.classList.add('error');
      isValid = false;
    } else {
      messageError.textContent = '';
      messageError.style.display = 'none';
      messageInput.classList.remove('error');
    }

    // Eğer form geçerli değilse gönderimi durdur
    if (!isValid) {
      e.preventDefault();
    }
  });

  // E-posta formatını kontrol eden fonksiyon
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Kullanıcı alanlara girdiğinde hata mesajını kaldırma
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim() !== '') {
      nameError.textContent = '';
      nameError.style.display = 'none';
      nameInput.classList.remove('error');
    }
  });

  emailInput.addEventListener('input', function () {
    if (emailInput.value.trim() !== '' && validateEmail(emailInput.value.trim())) {
      emailError.textContent = '';
      emailError.style.display = 'none';
      emailInput.classList.remove('error');
    }
  });

  messageInput.addEventListener('input', function () {
    if (messageInput.value.trim() !== '') {
      messageError.textContent = '';
      messageError.style.display = 'none';
      messageInput.classList.remove('error');
    }
  });
});
