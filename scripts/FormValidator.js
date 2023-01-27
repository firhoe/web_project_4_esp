export default class FormValidator {
  constructor(form, selectors) {
    this._form = form;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }

  _showInputError(input, errorMessage) {
    console.log(input);
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    console.log(errorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.setAttribute('disabled');
    }
  }

  doubleFunctions(formElement, inputElement, inputList, buttonElement, selectors) {
    this._checkInputValidity(formElement, inputElement, selectors);
    this._toggleButtonState(inputList, buttonElement, selectors);
  }

  _setEventListeners(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, selectors);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.doubleFunctions(formElement, inputElement, inputList, buttonElement, selectors);
      });
    });
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }
}
