enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

// Función que muestra el elemento erroneo para notificar al usuario

const showInputError = () => {};

// Función que oculta el elemento erroneo

const hideInputError = () => {};

// Función que valida Inputs

const checkInputValidity = () => {};

enableValidation();
