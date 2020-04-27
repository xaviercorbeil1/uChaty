export class User {
    private readonly _username: string;
    private readonly _socketId: string;
    constructor(username, socketId) {
        this._username = username;
        this._socketId = socketId;
    }


    get username(): string {
        return this._username;
    }

    get socketId(): string {
        return this._socketId;
    }


}
