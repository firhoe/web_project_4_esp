enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

//INTENTOS FALLIDOS DE FORMULARIO :(

const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__input');
const formError = formSelector.querySelector(`.${inputSelector.id}-error`);

const showError = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__error_visible');
};

const hideError = (input) => {
  input.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input_type_error');
  formError.textContent = ' ';
};

function checkInputValidity() {
  if (!inputSelector.validity.valid) {
    showError(formSelector, formSelector.validationMessage);
  } else {
    hideError(formSelector);
  }
}

formSelector.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formSelector.addEventListener('input', function () {
  checkInputValidity;
});

// Función que muestra el elemento erroneo para notificar al usuario

const showInputError = () => {};

// Función que oculta el elemento erroneo

const hideInputError = () => {};

// Función que valida Inputs

//const checkInputValidity = () => {};

//enableValidation();
