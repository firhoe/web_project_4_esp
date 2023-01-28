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
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
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
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  doubleFunctions(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.doubleFunctions(input);
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
