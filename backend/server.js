// import package nodejs
import express from "express";
import dotenv from "dotenv";
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


const port = process.env.PORT || 4000;


app.use(express.json())
app.use(cookieParser())


// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
  connectToDB();
});
