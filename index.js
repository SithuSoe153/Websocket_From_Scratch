let express = require("express");
let socket = require("socket.io");
// app setup
let app = express();

// server setup
let server = app.listen(4000, () => {
  console.log("server is running on port 4000");
});

// Route setup
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Socket setup
let io = socket(server);
io.on("connection", (socket) => {
  // console.log("user connected ++ " + socket.id);
  // socket.on("disconnect", () => {
  //   console.log("user disconnected -- " + socket.id);
  // });

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
  });
});
