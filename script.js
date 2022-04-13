'use strict';

///////////////////////////////////////

//SELECTING ELEMENTS
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// this returns html collection (which collects all the button tag elements) if there are any changes in dom the
// collection also gets updated immediately
console.log(document.getElementsByTagName('button'));
console.log(document.getElementsByClassName('btn'));

// this returns a single element
console.log(document.querySelector('.btn'));
console.log(document.getElementById('section'));
// to select multiple elements
console.log(document.querySelectorAll('.btn'));

//CREATING AND INSERTING ELEMENTS
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics.<button class="btn btn--close--cookie">Got It!</button>';
// const header = document.querySelector('.header');
/*prepend inserts the message element as the first child of header element
 header.prepend(message);*/

//  append inserts the message element as the last child of header element
// header.append(message);

/* multiple copies of the same element
1.copy /clone the element*/
// header.append(message.cloneNode(true));

/* inserts the element before the header element
header.before(message);
inserts the element after the header
header.after(message);*/

// DELETE ELEMENTS
// document.addEventListener('click', function () {
//   message.remove();
// });

// STYLES
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// to get the styles from css
// console.log(getComputedStyle(message).color);

// 10 is the regex base of the numeral system (base 10-0-9).
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// to change the style of our change by setting one property
// document.documentElement.style.setProperty('--color-primary', 'lightblue');

// ATTRIBUTES
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);

// to set alt
// logo.alt = 'Beautiful minimalist logo';
// to get absolute url (original)
// console.log(logo.src);
// to get the relative url (url wrote in the html)
// console.log(logo.getAttribute('src'));

/*we use data attributes when we work with UI & to store data in UI
console.log(logo.dataset.versionNumber);
 */
/*Classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

*/

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// its a node list and it has foreach method
btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//IMPLEMENTING SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
});
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
// slider component
function sliderComponent() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dots = document.querySelector('.dots');
  let currentScroll = 0;
  //
  function createDots() {
    slides.forEach((_, index) => {
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  }
  createDots();

  function activeDot(slidevalue) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(el => el.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide = "${slidevalue}"]`)
      .classList.add('dots__dot--active');
  }
  activeDot(0);

  dots.addEventListener('click', e => {
    // console.log(e.target);
    // console.log(e.currentTarget);
    if (e.target.classList.contains('dots__dot')) {
      let dataSlide = e.target.dataset.slide;
      activeDot(dataSlide);
      slideMovements(dataSlide);
    }
  });

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  function slideMovements(currentScroll) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentScroll) * 100}%)`;
    });
  }
  slideMovements(0);

  function rightScroller() {
    if (slides.length - 1 == currentScroll) currentScroll = 0;
    else currentScroll++;

    slideMovements(currentScroll);
    activeDot(currentScroll);
  }

  function leftScroller() {
    if (currentScroll == 0) currentScroll = slides.length - 1;
    else currentScroll--;

    slideMovements(currentScroll);
    activeDot(currentScroll);
  }
  btnRight.addEventListener('click', rightScroller);
  btnLeft.addEventListener('click', leftScroller);
}

sliderComponent();
