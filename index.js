const express = require("express");
var http = require("http");
const app = express();

var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

var clients = {};

app.get("/",(req,res)=>{
    res.send("Hii i am sachin");
})
io.on("connection",(socket)=>{
    socket.on("signin",(id)=>{
        clients[id] = socket;
    })
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetid = msg.targetid
        if(clients[targetid]){
            clients[targetid].emit("message",msg);
        }
    });
})




server.listen(3000,()=>{
    console.log('listening on *:3000');
})