"use strict"

//클라이언트의 socket.io가 담김
const socket = io();

const nickName = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendBtn = document.querySelector(".send-btn");

sendBtn.addEventListener("click", () => {
    const param = {
        name : nickName.value,
        msg : chatInput.value
    }
    socket.emit("chatting", param);

});

socket.on("chatting", (data) => {
    //console.log(data);
    const li = document.createElement("li");
    li.innerText = `${data.name}님이 - ${data.msg}`;
    chatList.appendChild(li);
});

console.log(socket);