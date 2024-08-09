// import package nodejs
import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// connect to database
import connectToDB from "./configs/db.js";
//cookie parser
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.length("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(port, () => {
  connectToDB();
});
