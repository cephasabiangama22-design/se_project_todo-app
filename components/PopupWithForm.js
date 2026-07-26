import Popup from "./Popups.js";

class popupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });

    this._form = this._popupEl.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(evt);
    });
  }
}
export default popupWithForm;
