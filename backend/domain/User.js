class User {
    constructor(username, socketId) {
        this._username = username;
        this._socketId = socketId;
    }

    get username() {
        return this._username;
    }

    get socketId() {
        return this._socketId;
    }
}

module.exports.User = User