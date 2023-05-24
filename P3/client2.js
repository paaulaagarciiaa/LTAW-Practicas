//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const msg_user = document.getElementById("msg_user");

let user = 'Anónimo';

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
socket.on("connect", () => {
    //-- Enviar mensaje inicial
    socket.send("Alguien se unió al chat");
  });

  socket.on("disconnect", () => {
    //-- Enviar mensaje inicial
    socket.send("Alguien abandonó el chat");
  });  

socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_user.value + ':' + '' + msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

msg_user.onchange = () => {
    if(msg_user.value){
      user = msg_user.value;
    }
}