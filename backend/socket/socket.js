import { Server } from "socket.io";
import http from "http";
import express from "express";
import UserModel from "../models/user.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
  },
});

export const getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};

const userSocketMap = {}; // {userId : socketId}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  //get Online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //typing
  socket.on("typing", async ({ receiverId, isTyping }) => {
    const receiverSocketId = getReciverSocketId(receiverId);
    if (receiverSocketId) {
      const snder = await UserModel.findOne({ _id: userId }, "fullname");
      io.to(receiverSocketId).emit("typing", {
        snderName: snder.fullname,
        isTyping,
        receiverId,
      });
    }
  });


  //disconnect
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
