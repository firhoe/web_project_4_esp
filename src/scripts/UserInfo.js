export default class UserInfo {
  constructor({userName, userOcupation, userAvatar, userId}) {
    this._userName = document.querySelector(userName);
    this._userOcupation = document.querySelector(userOcupation);
    this._userId = userId;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userOcupation: this._userOcupation.textContent,
    };
  }

  setUserInfo(data) {
    const {userName, userOcupation} = data;
    this._userName.textContent = userName;
    this._userOcupation.textContent = userOcupation;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
