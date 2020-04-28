import {User} from "./User";

export class Room {
    private readonly _users: User[];
    private readonly _roomId: string;
    private readonly maxUser: number;

    constructor(roomId) {
        this._roomId = roomId
        this.maxUser = 5
        this._users = []
    }

    addUser(user) {
        if (this._users.length < this.maxUser && !this._users.includes(user)) {
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


    get roomId(): string {
        return this._roomId;
    }

    get users(): User[] {
        return this._users;
    }

    get usernames(): string[] {
        const usernames = []
        this.users.forEach(user => {
          usernames.push(user.username)
        })
        return usernames
    }
}

module.exports.Room = Room