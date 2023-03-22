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
};
refs.buttonShowInput.addEventListener('click', buttonShowInputClick);
refs.form.addEventListener('submit', onFormSubmit);
refs.buttonClose.addEventListener('click', onCloseMenu);
refs.openMenuBtn.addEventListener('click', onMenuOpen);

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
