import {Room} from "./models/Room";
import {User} from "./models/User";

const io = require("socket.io")
const shortId = require('shortid');


const PORT = process.env.PORT || 3003
const server = io.listen(PORT);

let rooms: Map<string, Room> = new Map();
let users: Map<string, User> = new Map()

console.info(`Server started on port ${PORT}`)

server.on("connection", (socket => {
    let user: User
    let room: Room
    const socketId = socket.id;

    console.info(`Client connected [id=${socketId}]`)

    socket.on("disconnect", () => {
        console.info(`Client quit id=${socketId}]`)

        if (room) {
            room.removeUser(user)
            console.info(`User [user = ${user.username}] left the room [id=${room.roomId}]`)
        }

        if (user) {
            users.delete(user.username)
            console.info(`User deleted [id=${socketId}] with [username = ${user.username}]`)
        }
    })

    socket.on('createVideoConference', (giveRoomId) => {
        const id = shortId.generate()
        room = new Room(id)
        room.addUser(user)
        rooms.set(id, room)
        console.info(`Video conference created [id=${id}] by [username = ${user.username}]`)
        giveRoomId(id)
    })

    socket.on('joinVideoConference', (roomId, giveUsers) => {
        if (rooms.has(roomId)) {
            room = rooms.get(roomId)
            try {
                socket.emit("get room users", room.usernames);
                room.addUser(user)
                console.info(`Video conference joined [id=${roomId}] by [username = ${user.username}]`)
            } catch (e) {
                giveUsers("fullroom")
            }
        } else {
            giveUsers("noroom")
        }
    })

    socket.on('createUsername', (username, giveStatus) => {
        if (users.has(username)) {
            giveStatus(false)
        } else {
            console.info(`User created [id=${socketId}] with [user = ${username}]`)
            user = new User(username, socketId)
            users.set(username, user)
            giveStatus(true)
        }
    })

    socket.on("send signal", (username, signal) => {
        const user = users.get(username)
        if(user) {
            console.log(`signal from ${username}`)
            socket.to(user.socketId).emit("user joined", signal, username)
        }
    })

    socket.on("return signal", (username, signal) => {
        const user = users.get(username)
        if(user) {
            socket.to(user.socketId).emit("receive signal", signal, username)
        }
    })


}))

