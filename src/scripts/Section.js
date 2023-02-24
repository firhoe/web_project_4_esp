export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }

  setItems(items) {
    this._items = items;
  }

  prepend(item) {
    this._items = [item, ...this._items];
    this.renderer();
  }
}
