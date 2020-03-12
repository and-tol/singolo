document.addEventListener('DOMContentLoaded', () => {
  ('use strict');

  // === Menu === //
  //--- Smooth scrolling with web API: scrollIntoView --- //
  // const linkNav = document.querySelectorAll(`[href^='#']`);
  // Get all Menu items with class="nav__item" inside nav block
  const linksNav = document.querySelectorAll(`.nav__item`);
  // Get all Menu target with id & section tag
  const targetNav = document.querySelectorAll('section[id]');

  /**
   * Function handleLinkNavClick. Implement a smooth transition by clicking on a menu item to the target block
   * @param {Element} target
   */
  const handleLinkNavClick = target => {
    target.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  for (let i = 0; i < linksNav.length; i++) {
    linksNav[i].addEventListener('click', () => handleLinkNavClick(targetNav[i]));
  }

  // --- Toggle menu --- //
  const nav = document.querySelector('.nav');
  // Loop through the nav-items and add the active class to the current/clicked nav-items

  linksNav.forEach(element => {
    element.addEventListener('click', () => {
      const current = document.querySelector('.nav__item_active');
      const currentIsActive = current.classList.contains('nav__item_active');
      const elementIsActive = element.classList.contains('nav__item_active');

      if (currentIsActive === elementIsActive) {
        return;
      }

      element.classList.add('nav__item_active');
      current.classList.remove('nav__item_active');
    });
  });

  // === SLIDER === //
  // --- Phone screen reaction --- //
  const slide1 = document.querySelector('.slide-1');

  slide1.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('picture-b__screen')) {
      target.classList.toggle('toggle-screen');
    }
    if (target.classList.contains('picture-a__screen')) {
      target.classList.toggle('toggle-screen');
    }
  });

  // --- Slidershow --- //
  // find elements
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const sectionHeader = document.querySelector('.header');

  // find/create content element NodeList
  const slides = document.querySelectorAll('.slide');

  // functions definitions
  const slideShowToggle = () => {
    slides[currentSlideIndex].classList.toggle('js-show');
  };
  // section Header background color changing
  const headerColorChange = () => {
    sectionHeader.classList.toggle('js-background_blue');
  };

  let currentSlideIndex = 0;
  slideShowToggle();

  const onShowNextBtnClick = () => {
    slideShowToggle();
    currentSlideIndex++;
    // для бесконечного слайдера
    if (currentSlideIndex === slides.length) {
      currentSlideIndex = 0;
    }
    slideShowToggle();
    // slides[currentSlideIndex].classList.toggle('js-slide-move_next');

    // изменение цвета бэкграунда
    headerColorChange();
  };

  const onShowPrevBtnClick = () => {
    slideShowToggle();
    currentSlideIndex--;
    // для бесконечного слайдера
    if (currentSlideIndex < 0) {
      currentSlideIndex = slides.length - 1;
    }
    slideShowToggle();

    // изменение цвета бэкграунда
    headerColorChange();
  };

  // subscribe to events
  prevBtn.addEventListener('click', onShowPrevBtnClick);
  nextBtn.addEventListener('click', onShowNextBtnClick);

  // === Portfolio === //
  // Portfolio works list
  const portfolioWorks = document.querySelectorAll('.work');
  // console.log('portfolioWorks', portfolioWorks[0].childNodes[1].childNodes[1].src);
  // Portfolio toggle button list
  const portfolioButtons = document.querySelectorAll('.works__btn-toggle');
  // Portfolio navigation
  const portfolioNav = document.querySelector('.works-toggle');
  // Portfolio works container
  const worksContent = document.querySelector('.works__content');

  /**
   * Function onTogglePortfolioButton
   * Portfolio Tab Switching
   */
  const onTogglePortfolioButton = event => {
    portfolioButtons.forEach(el => el.classList.remove('works__btn-toggle_active'));

    event.target.classList.add('works__btn-toggle_active');

    // shuffleArray(portfolioWorks);
    renderPortfolioWorks();
  };

  /** Function shuffleArray. Shuffle Array
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   * @param {array} array
   */
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  /**
   * Function workTemplate.
   * Create template one work from portfolio
   * @param {string} picture
   * @return {string}
   */
  function workTemplate(picture) {
    return `
    <figure class="work">
      <a class="work__link">
        <img class="work__img" src="./assets/img/${picture}.jpg" alt="${picture}" />
      </a>
    </figure>
    `;
  }

  /**
   * Function worksArray.
   * Create array of name of portfolio works
   * @param {number} n - quantity of works in portfolio
   * @returns {array}
   */
  function worksArray(n) {
    const works = [];
    for (let i = 0; i < n; i++) {
      if (i < 9) {
        works[i] = `work0${i + 1}`;
      } else {
        works[i] = `work${i + 1}`;
      }
    }
    return works;
  }

  /**
   * Function renderPortfolioWorks
   * Render portfolio works
   */
  function renderPortfolioWorks() {
    let fragment = '';
    const pictures = worksArray(12);
    const shuffleWorks = shuffleArray(pictures);

    worksContent.innerHTML = '';

    shuffleWorks.forEach(picture => {
      const el = workTemplate(picture);
      fragment += el;
    });

    worksContent.insertAdjacentHTML('afterbegin', fragment);
  }

  // Events
  // Click on tab in Portfolio
  portfolioNav.addEventListener('click', onTogglePortfolioButton);
});
