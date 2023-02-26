export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // _returnRes es una función útil para manejar errores y procesar los datos recibidos de las solicitudes de API
  _returnRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  //getCardList hara una petición para obtener las tarjetas iniciales
  getCardList() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  //getUserInfo hara una petición para obtener los datos del usuario actual
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  //setUserInfo hara una petición PATCH al endpoint para actualizar los datos del usuario actual con el nombre y descripción especificados.
  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        return this._returnRes(res);
      })
      .catch((err) => console.log(err));
  }

  //addCard hara una petición POST al endpoint para crear una nueva tarjeta con el nombre y link especificados.
  addCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  //removeCard hara una petición DELETE al endpoint para eliminar la tarjeta con el id especificado.
  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  //setUserAvatar hara una petición PATCH al endpoint para actualizar el avatar del usuario actual con el link especificado.
  setUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatarUrl: avatar,
      }),
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  //addLike hara una petición PUT al endpoint para agregar un like a la tarjeta con el id especificado.
  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }

  //removeLike hara una petición DELETE al endpoint para eliminar el like a la tarjeta con el id especificado.
  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._returnRes(res);
    });
  }
}
