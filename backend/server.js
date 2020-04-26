const io = require("socket.io")

const PORT = process.env.PORT || 3003
const server = io.listen(PORT);

let connectedClient = new Map();

console.info(`Server started on port ${PORT}`)

server.on("connection", (socket => {
    console.info(`Client connected [id=${socket.id}]`)
    connectedClient.set(socket, 1)

    socket.on("disconnect", () => {
        connectedClient.delete(socket)
        console.info(`Client quit id=${socket.id}]`)
    })
}))

setInterval(() => {
    for (const [client, sequenceNumber] of connectedClient.entries()) {
        client.emit("seq-num", sequenceNumber);
        connectedClient.set(client, sequenceNumber + 1);
    }
}, 1000);