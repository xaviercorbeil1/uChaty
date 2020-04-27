const io = require("socket.io")
const shortId = require('shortid');
const {Room} = require("./domain/Room");
const {User} = require("./domain/User");

const PORT = process.env.PORT || 3003
const server = io.listen(PORT);

let rooms = new Map();
let users = new Map()

console.info(`Server started on port ${PORT}`)

server.on("connection", (socket => {
    let user
    let room
    const socketId = socket.id;

    console.info(`Client connected [id=${socketId}]`)

    socket.on("disconnect", () => {
        console.info(`Client quit id=${socketId}]`)

        if (user) {
            console.info(`User deleted [id=${socketId}] with [user = ${user}]`)
        }
    })

    socket.on('createVideoConference', (giveRoomId) => {
        const id = shortId.generate()
        room = new Room(id)
        room.addUser(user)
        rooms.set(id, room)
        console.info(`Video conference created [id=${id}] by [user = ${user.username}]`)
        giveRoomId(id)
    })

    socket.on('joinVideoConference', (roomId, giveUsers) => {
        if (rooms.has(roomId)) {
            room = rooms.get(roomId)
            giveUsers(room.users)
            try {
                room.addUser(user)
                console.info(`Video conference joined [id=${roomId}] by [user = ${user.username}]`)
                console.info(`Video conference [id=${roomId}] has [user = ${user.username}]`)
            } catch (e) {}
        } else {
            giveUsers(undefined)
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
}))
