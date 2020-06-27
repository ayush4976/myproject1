const socket = io('http://localhost:8000');

// Get DOM elements in respective JS variables
const form = document.getElementById('send_container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container"); 

// Audio that will play when msg sent
var audio = new Audio('ting.mp3');

// Function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);     
    if(position == 'left')
    audio.play();
}

// if form submitted send msg to server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
})

// Ask for user name and let server know
const name = prompt("Enter Your Name To Join Chat");
// while(name == "" || name == null){
//     name = prompt("Enter Your Name To Join Chat");
// }
socket.emit('new-user-joined',name);

// if a new user joins, receive user name from server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})

// if server sends msg then receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

// if a user leaves the chat, append the info to container
socket.on('left', name =>{
    append(`${name} left the chat`, 'right');
})