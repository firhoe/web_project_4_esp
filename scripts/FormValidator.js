export default class FormValidator {
  constructor(selectors) {
    this._selectors = selectors;
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }
  _showInputError(formElement, inputElement, errorMessage, selectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  }

  _hideInputError(formElement, inputElement, selectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement, selectors) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
      this._hideInputError(formElement, inputElement, selectors);
    }
  }

  twiceFunctions(formElement, inputElement, inputList, buttonElement, selectors) {
    this._checkInputValidity(formElement, inputElement, selectors);
    this._toggleButtonState(inputList, buttonElement, selectors);
  }

  _setEventListeners(formElement, selectors) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._selectors);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener(
        'input',
        this.twiceFunctions(formElement, inputElement, inputList, buttonElement, selectors)
      );
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement, this._selectors);
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, selectors) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  }
}
