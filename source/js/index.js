// Slider
const sliderList = document.querySelector('.tournament-participants__list');
const slides = document.querySelectorAll('.tournament-participants__item');
const prevButton = document.querySelector('.tournament-participants__button-prev');
const nextButton = document.querySelector('.tournament-participants__button-next');
const currentSlide = document.querySelector('.tournament-participants__current');
const totalSlides = document.querySelector('.tournament-participants__total');

let slideIndex = 0;
let slidesPerPage = getSlidesPerPage();

function getSlidesPerPage() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 700) {
    return 1;
  } else {
    return 3;
  }
}

function showSlider() {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  for (let i = slideIndex; i < slideIndex + slidesPerPage; i++) {
    if (i >= slides.length) break;
    slides[i].style.display = 'block';
  }

  countSlides();
}

function showNextSlides() {
  slideIndex += slidesPerPage;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlider();
}

function showPrevSlides() {
  slideIndex -= slidesPerPage;
  if (slideIndex < 0) {
    const remainder = slides.length % slidesPerPage;
    slideIndex = remainder === 0 ? slides.length - slidesPerPage : slides.length - remainder;
  }
  showSlider();
}

function countSlides() {
  let endSlide = slideIndex + slidesPerPage;
  if (endSlide > slides.length) endSlide = slides.length;
  currentSlide.textContent = endSlide;
  totalSlides.textContent = slides.length;
}

function initSlider() {
  nextButton.addEventListener('click', showNextSlides);
  prevButton.addEventListener('click', showPrevSlides);
  showSlider();

  window.addEventListener('resize', () => {
    const newSlidesPerPage = getSlidesPerPage();
    if (newSlidesPerPage !== slidesPerPage) {
      slidesPerPage = newSlidesPerPage;
      slideIndex = 0;
      showSlider();
    }
  });
}

initSlider();


// Слайдер для блока с карточками


document.addEventListener('DOMContentLoaded', () => {
  const MOBILE_BREAKPOINT = 376;
  const TABLET_BREAKPOINT = 671;
  const listItems = document.querySelectorAll('.tournament-stages__item');
  const nextButton = document.querySelector('.tournament-stages__button-next');
  const prevButton = document.querySelector('.tournament-stages__button-prev');
  const paginationButtons = document.querySelectorAll('.tournament-stages__pagination-button');
  let isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  let isTablet = window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT;
  const slides = [
      ['tournament-stages__item--1', 'tournament-stages__item--2'],
      ['tournament-stages__item--3'],
      ['tournament-stages__item--4', 'tournament-stages__item--5'],
      ['tournament-stages__item--6'],
      ['tournament-stages__item--7']
  ];
  let currentSlide = 0;

  const showSlide = (slideIndex) => {
      listItems.forEach(item => {
          item.style.display = 'none';
      });
      slides[slideIndex].forEach(className => {
          const element = document.querySelector(`.${className}`);
          if (element) {
              element.style.display = 'block';
          }
      });
      paginationButtons.forEach((button, index) => {
          button.style.backgroundColor = index === slideIndex ? '#313131' : '#d9d9d9';
      });
      prevButton.disabled = slideIndex === 0;
      nextButton.disabled = slideIndex === slides.length - 1;
  };

  const initSlider = () => {
      isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      isTablet = window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT;
      if (isMobile || isTablet) {
          currentSlide = 0;
          showSlide(currentSlide);
          prevButton.disabled = true;
          nextButton.disabled = slides.length === 1;
      } else {
          listItems.forEach(item => {
              item.style.display = 'block';
          });
          prevButton.disabled = true;
          nextButton.disabled = true;
          paginationButtons.forEach(button => {
              button.style.backgroundColor = '#d9d9d9';
          });
      }
  };

  nextButton.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
          currentSlide++;
          showSlide(currentSlide);
      }
  });

  prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
          currentSlide--;
          showSlide(currentSlide);
      }
  });

  paginationButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          currentSlide = index;
          showSlide(currentSlide);
      });
  });

  initSlider();
  window.addEventListener('resize', () => {
      const wasMobile = isMobile;
      const wasTablet = isTablet;
      isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      isTablet = window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT;
      if (wasMobile !== isMobile || wasTablet !== isTablet) {
          initSlider();
      }
  });
});
