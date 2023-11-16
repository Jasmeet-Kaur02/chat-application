const express = require("express");
const http = require("http");
require("dotenv").config();
const cors = require("cors");
const { signin, signup } = require("./src/controllers/AuthController");
const userRouter = require("./src/routes/user");
const { verifyToken } = require("./src/middleware/Authorization");
const { validateUserId } = require("./src/middleware/users");
const {
  joinNewRoom,
  existingRoomHandler,
  leaveRoom,
  sendMessage,
} = require("./src/socket");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const PORT = 8000;
app.use(express.json());
app.use(cors());

const io = new Server(httpServer, {
  cors: "http://localhost:3000",
  methods: ["PUT", "POST", "GET", "PATCH", "DELETE"],
});

io.on("connection", (socket) => {
  socket.on("joinNewRoom", ({ user, room }) => {
    joinNewRoom({ user, room }, io, socket);
  });

  socket.on("joinExistingRoom", ({ user, room }) => {
    existingRoomHandler({ user, room }, io, socket, "enter");
  });

  socket.on("message", ({ user, room, message }) => {
    sendMessage({ user, room, message }, io, socket);
  });

  socket.on("leaveRoom", ({ user, room }) => {
    leaveRoom({ user, room }, io, socket);
  });

  socket.on("logout", ({ user, room }) => {
    existingRoomHandler({ user, room }, io, socket, "leave");
  });
});

app.post("/signup", signup);
app.post("/signin", signin);
app.get("/", (req, res) => {
  res.send("Welcome to the ChitChat");
});
app.use("/users/:id", verifyToken, validateUserId, userRouter);

httpServer.listen(PORT, (err) => {
  if (err) {
    console.log(`Error while running server on the PORT ${PORT}`);
  }
  console.log(`Server is running on the PORT ${PORT}`);
});
