const express = require("express");
const cors = require("cors");
const messageHandler = require('./controllers/Messages');
require("dotenv").config();
require("./models/db");



const {auth}=require("./middleware/authentication")

const app = express();
const PORT = process.env.PORT || 5000;

const usersRouter = require("./routes/Users");
const postsRouter = require("./routes/posts");
const roleRouter = require("./routes/roles");
const searchRouter = require("./routes/Search");
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/search", searchRouter);
app.use("/createrole", roleRouter);

const {Server} = require("socket.io");

const http = require('http');
const SocketIo = require('socket.io');
const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);
const io = new Server(8080,{cors:{origin:"*"}});
const client = {}

wsServer.use(auth);

wsServer.on("connection",(socket)=>{

  const user_id=socket.handshake.headers.user_id;
  client[user_id]={socket_id:socket.id,user_id};

  messageHandler(socket, wsServer);
  
  socket.on("disconnect",()=>{
    for (const key in client) {
     if(client[key].socket_id===socket.id){
      delete client[key]
      console.log("disconnect");
     }
    }
    console.log(client);
  })

})
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
