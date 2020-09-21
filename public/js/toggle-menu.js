const $navbarBurger = document.querySelector('.navbar-burger');

function toggleMenu() {
  const $navbarMenu = document.querySelector('.navbar-menu');
  $navbarBurger.classList.toggle('is-active');
  $navbarMenu.classList.toggle('is-active');
}

$navbarBurger.addEventListener('click', toggleMenu);
