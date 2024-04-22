const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");

//프로젝트 폴더경로가 출력됨
//console.log(__dirname);

const io = socketIO(server);

app.use(express.static(path.join(__dirname,"src")));
const PORT = process.env.PORT || 5000;

io.on("connection",(socket) => {
    //console.log("연결 성공!");

    socket.on("chatting", (data) => {

        //Object 형식으로 data를 받음
        //console.log(data);
        
        io.emit("chatting", data);
    });
});

server.listen(PORT, ()=>console.log(`server is running ${PORT}`));