/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose && navMenu) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

const closeMenu = () => navMenu && navMenu.classList.remove('show-menu');
navLinks.forEach(link => link.addEventListener('click', closeMenu));

/*=============== HIDE MENU ON SCROLL ===============*/
const hideMenuOnScroll = () => {
  if (!navMenu) return;
  if (navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
  }
};
['scroll', 'touchmove', 'wheel'].forEach(evt => {
  window.addEventListener(evt, hideMenuOnScroll, { passive: true });
  document.addEventListener(evt, hideMenuOnScroll, { passive: true });
  if (navMenu) navMenu.addEventListener(evt, hideMenuOnScroll, { passive: true });
});

/*=============== CLOSE MENU WHEN SCROLL POSITION CHANGES ===============*/
let lastScrollY = window.scrollY;
const watchScrollPosition = () => {
  if (navMenu && navMenu.classList.contains('show-menu') && window.scrollY !== lastScrollY) {
    closeMenu();
  }
  lastScrollY = window.scrollY;
  requestAnimationFrame(watchScrollPosition);
};
requestAnimationFrame(watchScrollPosition);

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById('header');
  if (!header) return;

  if (window.scrollY >= 50) header.classList.add('blur-header');
  else header.classList.remove('blur-header');
};
window.addEventListener('scroll', blurHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  if (!scrollUp) return;

  if (window.scrollY >= 350) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 1200,
    delay: 200
  });

  sr.reveal('.home__content, .section__title, .footer__container, .footer__copy');
  sr.reveal('.home__images', {delay: 400});
  sr.reveal('.home__social', {delay: 500});
  sr.reveal('.new__card, .favorite__card', {interval: 100});
  sr.reveal('.about__image', {origin: 'left'});
  sr.reveal('.about__data', {origin: 'right'});
  sr.reveal('.visit__data', {origin: 'bottom'});
}
