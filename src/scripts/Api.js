export default class Api {
  constructor(options) {
    this._options = options;
  }

  //getHeaders obtiene el token de la API
  getHeaders() {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this._options.token);
    return myHeaders;
  }

  //getCardList hara una petición para obtener las tarjetas iniciales
  getCardsList() {
    const requestOptions = {
      method: 'GET',
      headers: this.getHeaders(),
      redirect: 'follow',
    };

    return fetch(`${this._options.url}/cards`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //getUserInfo hara una petición para obtener los datos del usuario actual
  getUserInfo() {
    const requestOptions = {
      method: 'GET',
      headers: this.getHeaders(),
      redirect: 'follow',
    };

    return fetch(`${this._options.url}/users/me`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //setUserInfo hara una petición PATCH al endpoint para actualizar los datos del usuario actual con el nombre y descripción especificados.
  setUserInfo(name, about) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.getHeaders(),
      redirect: 'follow',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    };

    return fetch(`${this._options.url}/users/me`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //addCard hara una petición POST al endpoint para crear una nueva tarjeta con el nombre y link especificados.
  addCard(title, link) {
    const requestOptions = {
      method: 'POST',
      headers: this.getHeaders(),
      redirect: 'follow',
      body: JSON.stringify({
        title: title,
        link: link,
      }),
    };

    return fetch(`${this._options.url}/cards`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //removeCard hara una petición DELETE al endpoint para eliminar la tarjeta con el id especificado.
  deleteCard(cardId) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.getHeaders(),
      redirect: 'follow',
    };

    return fetch(`${this._options.url}/cards/${cardId}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //setUserAvatar hara una petición PATCH al endpoint para actualizar el avatar del usuario actual con el link especificado.
  updateAvatar(avatar) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.getHeaders(),
      redirect: 'follow',
    };

    return fetch(`${this._options.url}/users/me/${avatar}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //addLike hara una petición PUT al endpoint para agregar un like a la tarjeta con el id especificado.
  addLike(cardId) {
    const requestOptions = {
      method: 'PUT',
      headers: this.getHeaders(),
      redirect: 'follow',
    };

    return fetch(`${this._options.url}/cards/likes/${cardId}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }

  //removeLike hara una petición DELETE al endpoint para eliminar el like a la tarjeta con el id especificado.
  removeLike(cardId) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.getHeaders(),
      redirect: 'follow',
    };

    return fetch(`${this._options.url}/cards/likes/${cardId}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log('error', error));
  }
}
