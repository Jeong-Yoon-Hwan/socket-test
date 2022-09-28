// server.js

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const PORT = 8081;
const io = socketio.listen(server);

app.get("/", (req, res) => {
    fs.readFile("./chat.html", (error, data) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
       
    });
});

io.sockets.on("connection", (socket) => {
    socket.on("message", (data) => {
        io.sockets.emit("message", data);
          console.log(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});