const refs = {
  buttonShowInput: document.querySelector('.show-search-input-btn'),
  input: document.querySelector('.search-input'),
  buttonSearch: document.querySelector('.search-btn'),
  form: document.querySelector('.search-form'),
};
refs.buttonShowInput.addEventListener('click', buttonShowInputClick);
refs.form.addEventListener('submit', onFormSubmit);

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
