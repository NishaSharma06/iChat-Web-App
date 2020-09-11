const socket=io('http://localhost:8000');

//get dom elements in respective js variables


const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
//audio that will play on receiving messages
var audio=new Audio('done-for-you.mp3');

//function that will append event info to container

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();


    }
    



}
//if form is submitted,send server the message

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=' ';
})
//Ask new user his/her name and let the server know

const name=prompt("Enter Your name to join");
socket.emit('new-user-joined',name);

//If a new user joins,receive user name  from server

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')

})
//If server sends a message,receive it
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')

})
//if a user leaves the chat,append info to container
socket.on('left',name=>{
    append(`${name} left the chat`,'right')

})