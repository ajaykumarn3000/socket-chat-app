import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
dotenv.config();

const port = 4000;
const client_url = "http://localhost:3000"

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: client_url,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("JOIN_ROOM", (data) => {
    socket.join(data);
    console.log("User with id " + socket.id + " joined room: " + data);
  });

  socket.on("SEND_MESSAGE", (data) => {
    socket.to(data.room).emit("RECEIVE_MESSAGE", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log("SERVER RUNNING ON PORT: " + port);
});
