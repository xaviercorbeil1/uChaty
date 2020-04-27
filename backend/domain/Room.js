class Room {
    constructor(roomId) {
        this._roomId = roomId
        this._maxUser = 5
        this._users = []
    }

    addUser(user) {
        if (this._users.length < this._maxUser && !this.users.includes(user)) {
            this._users.push(user);
        } else {
            throw "Room is full or user already in";
        }
    }

    removeUser(user) {
        const index = this._users.indexOf(user);
        if(index !== -1) {
            this._users.splice(index, 1);
        }
    }

    get users() {
        return this._users;
    }
}

module.exports.Room = Room