import io from "socket.io-client";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const socket = io(baseURL)
export default socket