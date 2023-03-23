const refs = {
  buttonShowInput: document.querySelector('.show-search-input-btn'),
  input: document.querySelector('.search-input'),
  buttonSearch: document.querySelector('.search-btn'),
  form: document.querySelector('.search-form'),
  buttonClose: document.querySelector('.menu-close-btn'),
  navigation: document.querySelector('.navigation'),
  openMenuBtn: document.querySelector('.menu-open-btn'),
  themeSwitcher: document.querySelector('.theme-switcher'),
  formContainer: document.querySelector('.form-container'),
  themeToggle: document.querySelector('#theme-toggle'),
};
refs.buttonShowInput.addEventListener('click', buttonShowInputClick);
refs.form.addEventListener('submit', onFormSubmit);
refs.buttonClose.addEventListener('click', onCloseMenu);
refs.openMenuBtn.addEventListener('click', onMenuOpen);
refs.themeToggle.addEventListener('click', toggleTheme);

function onMenuOpen(event) {
  refs.navigation.classList.remove('hide');
  refs.buttonClose.classList.remove('hide');
  refs.themeSwitcher.classList.remove('hide');
  refs.formContainer.classList.add('hide');
}
function onCloseMenu(event) {
  refs.navigation.classList.add('hide');
  refs.buttonClose.classList.add('hide');
  refs.formContainer.classList.remove('hide');
}

function buttonShowInputClick(event) {
  refs.input.classList.add('show');
  refs.buttonShowInput.classList.add('hide');
  refs.buttonSearch.classList.remove('hide');
}

function onFormSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.search_input.value;
  console.log(searchQuery);
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
