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
});
