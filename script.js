document.addEventListener('DOMContentLoaded', () => {
  ('use strict');

  //--- Smooth scrolling with web API: scrollIntoView --- //
  // const linkNav = document.querySelectorAll(`[href^='#']`);
  // Menu items
  const linksNav = document.querySelectorAll(`.nav__item`);
  console.log('linksNav', linksNav);
  const home = document.getElementById('home');
  const services = document.getElementById('services');
  const portfolio = document.getElementById('portfolio');
  const about = document.getElementById('about');
  const contact = document.getElementById('contact');

  const handleButtonClick = target => {
    console.log('HELLO', target);
    target.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  // --- Events --- //
  // Services

  linksNav[0].addEventListener('click', () => handleButtonClick(home));
  linksNav[1].addEventListener('click', () => handleButtonClick(services));
  linksNav[2].addEventListener('click', () => handleButtonClick(portfolio));
  linksNav[3].addEventListener('click', () => handleButtonClick(about));
  linksNav[4].addEventListener('click', () => handleButtonClick(contact));

  // --- Toggle menu --- //

  const nav = document.querySelector('.nav');
});
