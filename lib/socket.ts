import { io } from "socket.io-client";

const socket = io("https://task-board-socket-backend-1.onrender.com");

export default socket;
