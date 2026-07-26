class Popup {
  constructor({ popupSelector }) {
    this._popupEl = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupEl.querySelector(".popup__close");
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }
  _handleEscapeClose(evt) {
    console.log(evt.key);
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupEl.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupEl.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }
  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });

    this._popupEl.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup__close") ||
        evt.target.classList.contains("popup")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
