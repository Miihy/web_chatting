"use strict"

//클라이언트의 socket.io가 담김
const socket = io();

const nickName = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendBtn = document.querySelector(".send-btn");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13){
        send();
    }
});

function send(){
    const param = {
        name : nickName.value,
        msg : chatInput.value
    }
    socket.emit("chatting", param);
}

sendBtn.addEventListener("click", send);

socket.on("chatting", (data) => {
    //console.log(data);
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
});

//console.log(socket);

function LiModel(name, msg, time){
    this.name = name;    
    this.msg = msg;    
    this.time = time;   
    
    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickName.value == this.name ? "sent" : "received" );
        const dom = `<span class="profile">
                <span class="user">${this.name}</span>
                <img src="/original.png">
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li); 
    };
}