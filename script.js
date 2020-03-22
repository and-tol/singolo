document.addEventListener('DOMContentLoaded', () => {
  ('use strict');

  // === MENU === //
  //--- Smooth scrolling with web API: scrollIntoView --- //
  // const linkNav = document.querySelectorAll(`[href^='#']`);
  // Get all Menu items with class="nav__item" inside nav block
  const linksNav = document.querySelectorAll(`.nav__item`);
  const nav = document.querySelector('.nav');
  const navMobile = document.querySelector('.nav-mobile');
  const linksNavDesk = document.querySelectorAll(`.nav-desk__item`);
  const linksNavMob = document.querySelectorAll(`.nav-mobile__item`);
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

  for (let i = 0; i < linksNavDesk.length; i++) {
    linksNavDesk[i].addEventListener('click', () => handleLinkNavClick(targetNav[i]));
  }
  for (let i = 0; i < linksNavMob.length; i++) {
    linksNavMob[i].addEventListener('click', () => handleLinkNavClick(targetNav[i]));
  }

  // --- TOGGLE MENU --- //
  // const nav = document.querySelector('.nav');
  // Loop through the nav-items and add the active class to the current/clicked nav-items

  const onToggleMenuButton = event => {
    linksNavDesk.forEach(el => el.classList.remove('nav__item_active'));
    event.target.classList.add('nav__item_active');
  };

  nav.addEventListener('click', onToggleMenuButton);

  // linksNavDesk.forEach(element => {
  //   element.addEventListener('click', () => {
  //     let actives = document.querySelectorAll('.nav__item_active');
  //     const current = document.querySelector('.nav__item_active');
  //     const currentIsActive = current.classList.contains('nav__item_active');
  //     const elementIsActive = element.classList.contains('nav__item_active');

  //     if (currentIsActive === elementIsActive) {
  //       return;
  //     }

  //     current.classList.remove('nav__item_active');
  //     element.classList.add('nav__item_active');

  //   });
  // });

  // === SLIDE picture screen === //
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

  // === SLIDESHOW === //
  // find elements
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const sectionHeader = document.querySelector('.header');
  const arrowPrev = document.querySelector('.arrow__prev');
  const arrowNext = document.querySelector('.arrow__next');

  // find/create content element NodeList. collection of slides
  const slides = document.querySelectorAll('.slide');
  // Index active slide, first slide of collection slides
  let currentSlide = 0;
  // to delay animation / для задержки анимации
  let isEnabled = true;

  function changeCurrentSlide(n) {
    //to ensure continuous slide progression / чтобы обеспечить пепрерывную промотку слайдов
    currentSlide = (n + slides.length) % slides.length;
  }

  function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function() {
      this.classList.remove('active-slide', direction);
    });
  }
  function showSlide(direction) {
    slides[currentSlide].classList.add('next', direction);
    slides[currentSlide].addEventListener('animationend', function() {
      this.classList.remove('next', direction);
      this.classList.add('active-slide');
      isEnabled = true;
    });
  }
  function nextSlide(n) {
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
  }
  function previousSlide(n) {
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
  }

  function onShowPrevBtnClick() {
    // if simple slider
    // changeCurrentSlide(currentSlide - 1);

    if (isEnabled) {
      previousSlide(currentSlide);
    }
  }
  function onShowNextBtnClick() {
    // if simple slider
    // changeCurrentSlide(currentSlide - 1);

    if (isEnabled) {
      nextSlide(currentSlide);
    }
  }

  // Events Slideshow
  prevBtn.addEventListener('click', function() {
    if (isEnabled) {
      previousSlide(currentSlide);
      // Background color change
      headerColorChange();
    }
  });
  nextBtn.addEventListener('click', function() {
    if (isEnabled) {
      nextSlide(currentSlide);
      // Background color change
      headerColorChange();
    }
  });

  // == Swipe slide of slideshow == //
  const swipedetect = el => {
    let surface = el;
    let startX = 0;
    let startY = 0;
    // прошедшая дистанция
    let distX = 0;
    let distY = 0;
    let dist = 0;
    // time
    let startTime = 0;
    // время прошедшее до конца
    let elapsedTime = 0;

    // расстояние, которое считается свайпом
    let threshold = 150;
    // высота, которое считается свайпом
    let restraint = 100;
    let allowedTime = 300;

    // Events for mouse
    surface.addEventListener('mousedown', function(event) {
      startX = event.pageX;
      startY = event.pageY;
      startTime = new Date().getTime();

      event.preventDefault();
    });
    surface.addEventListener('mouseup', function(event) {
      distX = event.pageX - startX;
      distY = event.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= threshold) {
          if (distX > 0) {
            if (isEnabled) {
              previousSlide(currentSlide);
            }
          } else {
            if (isEnabled) {
              nextSlide(currentSlide);
            }
          }
        }
      }

      event.preventDefault();
    });

    // Events for touch
    surface.addEventListener('touchstart', function(event) {
      // для срабатывание стрелок
      console.log(event.target);
      if (
        event.target.classList.contains('slider__nav') ||
        event.target.classList.contains('arrow') ||
        event.target.classList.contains('arrow-svg')
      ) {
        if (event.target.classList.contains('prev') || event.target.classList.contains('arrow-prev')) {
          if (isEnabled) {
            previousSlide(currentSlide);
          }
        } else if (event.target.classList.contains('next') || event.target.classList.contains('arrow-next')) {
          if (isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }

      let touchObj = event.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();

      event.preventDefault();
    });
    surface.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
    surface.addEventListener('touchend', function(event) {
      let touchObj = event.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= threshold) {
          if (distX > 0) {
            if (isEnabled) {
              previousSlide(currentSlide);
            }
          } else {
            if (isEnabled) {
              nextSlide(currentSlide);
            }
          }
        }
      }

      event.preventDefault();
    });
  };

  const slider = document.querySelector('.slider');

  swipedetect(slider);

  // section Header color changing
  function headerColorChange() {
    // section Header background color changing
    sectionHeader.classList.toggle('js-background_blue');
    // slideshow arrows color change
    arrowPrev.classList.toggle('js-arrow_blue');
    arrowNext.classList.toggle('js-arrow_blue');
  }

  // -- old slider -- //
  /*   const slideShowToggle = () => {
    slides[currentSlideIndex].classList.toggle('js-show');
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

    // Background color change
    headerColorChange();
    // Arrow color change
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
  }; */

  // subscribe to events
  // prevBtn.addEventListener('click', onShowPrevBtnClick);
  // nextBtn.addEventListener('click', onShowNextBtnClick);

  // === PORTFOLIO === //
  // Portfolio works list
  const portfolioWorks = document.querySelectorAll('.work');
  // Portfolio block with class work_border-inset
  const insetBorderBlocks = document.querySelectorAll('.work_border-inset');
  const insetBorderBlock = document.querySelector('.work_border-inset');
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

  /**
   * Function onTogglePortfolioButton
   * Portfolio Works inset border Switching
   */
  const onTogglePortfolioWork = event => {
    // create DOM element with attribute class
    const borderBlock = document.createElement('div');
    borderBlock.setAttribute('class', 'work_border-inset');

    // Add inner border block
    event.target.closest('.work').prepend(borderBlock);
  };

  /**
   * Function clearBorderBlock
   * Clear inner border block
   */
  function clearBorderBlock() {
    const insetBorderBlocks = document.querySelectorAll('.work_border-inset');
    insetBorderBlocks.forEach(el => {
      el.remove();
    });
  }

  // PORTFOLIO. subscribe to  Events
  // Click on tab in Portfolio
  portfolioNav.addEventListener('click', onTogglePortfolioButton);
  worksContent.addEventListener('click', () => {
    // Clear inner border block
    clearBorderBlock();

    onTogglePortfolioWork(event);
  });

  // === FORM === //
  const form = document.forms['contact-form'];
  const submitBtn = document.querySelector('#submit-btn');
  const closeBtn = document.querySelector('#close-btn');
  const messageBlock = document.querySelector('.message-block');
  const messageContent = document.querySelector('.message__content');

  const sendMessage = event => {
    event.preventDefault();

    // Get inputs value
    const nameValue = form.name.value;
    const emailValue = form.email.value;
    const subjectValue = form.subject.value;
    const describeValue = form.describe.value;

    // Remove class hidden
    messageBlock.classList.remove('hidden');

    // Set message elements
    const messageTitle = document.createElement('h4');
    messageTitle.classList.add('message__title');
    messageTitle.textContent = 'Email sent';

    // Message elements
    const subject = document.createElement('p');
    const describe = document.createElement('p');
    const ok = document.createElement('p');
    ok.classList.add('ok');
    ok.textContent = 'ok';

    let fragment = document.createDocumentFragment();

    if (subjectValue === '') {
      subject.textContent = 'No topic';
    } else {
      subject.innerHTML = `Subject: <span class="">${subjectValue}</span>`;
    }
    if (describeValue === '') {
      describe.textContent = 'No describe';
    } else {
      describe.innerHTML = `Describe: <span class="">${describeValue}</span>`;
    }

    fragment.prepend(ok);
    fragment.prepend(describe);
    fragment.prepend(subject);

    messageContent.prepend(fragment);

    messageContent.prepend(messageTitle);
  };

  const closeMessageBlock = () => {
    messageBlock.classList.add('hidden');
    messageContent.innerHTML = '';

    form.reset();
  };

  // FORM. subscribe to  Events
  submitBtn.addEventListener('click', sendMessage);
  closeBtn.addEventListener('click', closeMessageBlock);

  // ===  TOGGLE MOBILE MENU === //
  const btnMobileMenu = document.querySelector('#btn-mob');
  const btnMobileMenuAct = document.querySelector('#btn-mob-active');
  const mobileMenuContainer = document.querySelector('.mobile-menu-container');
  // смотри выше

  const mobileMenuToggle = () => {
    mobileMenuContainer.classList.toggle('close');
  };

  // Events TOGGLE MOBILE MENU
  btnMobileMenu.addEventListener('click', mobileMenuToggle);
  btnMobileMenuAct.addEventListener('click', mobileMenuToggle);
  navMobile.addEventListener('click', mobileMenuToggle);
});
