const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

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
        const { name, msg } = data;
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:ss A")
        });
    });
});

server.listen(PORT, ()=>console.log(`server is running ${PORT}`));