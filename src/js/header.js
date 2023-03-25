const refs = {
  showFormBtn: document.querySelector('.form-open'),
  form: document.querySelector('.form-search'),
  navigation: document.querySelector('.menu'),
  openMenuBtn: document.querySelector('.menu-open'),
  closeMenuBtn: document.querySelector('.menu-close'),
  themeToggle: document.querySelector('#theme-toggle'),
  menu: document.querySelector('.menu'),
  themeSwitcher: document.querySelector('.theme-switcher'),
  menuDesc: document.querySelector('.menu-desc'),
};

refs.showFormBtn.addEventListener('click', onShowFormClick);
refs.closeMenuBtn.addEventListener('click', onCloseMenu);
refs.openMenuBtn.addEventListener('click', onMenuOpen);
refs.themeToggle.addEventListener('click', toggleTheme);
refs.menu.addEventListener('click', onMobileMenuItemClick);
refs.menuDesc.addEventListener('click', onMenuDeskItemClick);

function onMobileMenuItemClick(event) {
  if (event.target.nodeName !== 'A') {
    return;
  }
  const menuItemActive = document.querySelector('.menu-item-active');

  if (menuItemActive) {
    menuItemActive.classList.remove('menu-item-active');
  }
  event.target.parentNode.classList.add('menu-item-active');
}

function onMenuDeskItemClick(event) {
  if (event.target.nodeName !== 'A') {
    return;
  }
  const menuItemActive = document.querySelector('.menu-desc-link--active');

  if (menuItemActive) {
    menuItemActive.classList.remove('menu-desc-link--active');
  }
  event.target.parentNode.classList.add('menu-desc-link--active');
}

function onMenuOpen(event) {
  refs.form.style.display = 'none';
  refs.openMenuBtn.style.display = 'none';
  refs.closeMenuBtn.style.display = 'block';
  refs.showFormBtn.style.display = 'none';
  refs.navigation.style.display = 'block';
  refs.themeSwitcher.style.display = 'block';
}

function onCloseMenu(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  refs.navigation.style.display = 'none';
  refs.closeMenuBtn.style.display = 'none';
  refs.openMenuBtn.style.display = 'block';
  refs.showFormBtn.style.display = 'block';
  refs.themeSwitcher.style.display = 'none';
}

function onShowFormClick(event) {
  refs.form.style.display = 'block';
  refs.showFormBtn.style.display = 'none';
}

// for theme-switcher
const LIGHT_THEME_CLASS = 'light-theme';
const DARK_THEME_CLASS = 'dark-theme';
const THEME_KEY = 'theme';
let defaultTheme = LIGHT_THEME_CLASS;

checkTheme();

refs.themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
  defaultTheme =
    defaultTheme === LIGHT_THEME_CLASS ? DARK_THEME_CLASS : LIGHT_THEME_CLASS;
  localStorage.setItem(THEME_KEY, defaultTheme);
  applyTheme();
}

function applyTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === DARK_THEME_CLASS) {
    document.body.classList.remove(LIGHT_THEME_CLASS);
    document.body.classList.add(DARK_THEME_CLASS);
  } else {
    document.body.classList.remove(DARK_THEME_CLASS);
    document.body.classList.add(LIGHT_THEME_CLASS);
  }

  refs.themeToggle.checked = savedTheme === DARK_THEME_CLASS;
}

function checkTheme() {
  if (localStorage.getItem(THEME_KEY)) {
    applyTheme();
  } else {
    localStorage.setItem(THEME_KEY, defaultTheme);
  }
  applyTheme();
}
