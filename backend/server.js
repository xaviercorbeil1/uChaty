const io = require("socket.io")
const shortId = require('shortid');

const PORT = process.env.PORT || 3003
const server = io.listen(PORT);

let videoConferences = new Map();
let users = new Map()

console.info(`Server started on port ${PORT}`)

server.on("connection", (socket => {
    let currentUsername = ""
    const socketId = socket.id;

    console.info(`Client connected [id=${socketId}]`)

    socket.on("disconnect", () => {
        console.info(`Client quit id=${socketId}]`)

        if(currentUsername !== "") {
            console.info(`User deleted [id=${socketId}] with [user = ${currentUsername}]`)
            users.delete(currentUsername)
        }

    })

    socket.on('createVideoConference', (data) => {
        const username = data.username
        const id = shortId.generate()
        videoConferences.set(id, [username])
        console.info(`Video conference created [id=${id}] by [user = ${username}]`)
    })

    socket.on('createUsername', (username, fn) => {
        if (users.has(username)) {
            fn(false)
        } else {
            console.info(`User created [id=${socketId}] with [user = ${username}]`)
            currentUsername = username
            users.set(username, socketId)
            fn(true)
        }
    })
}))
