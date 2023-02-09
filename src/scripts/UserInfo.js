export default class UserInfo {
  constructor({userName, userOcupation}) {
    this._userName = document.querySelector(userName);
    this._userOcupation = document.querySelector(userOcupation);
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
}
