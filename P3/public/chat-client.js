//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const button = document.getElementById("button");
const username = prompt("Ingrese su nombre de usuario:");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
socket.emit("nuevo usuario", username);

socket.on("connect", () => {
  //-- Enviar mensaje inicial
  socket.send(`${username}, se unió al chat!`);
});

socket.on("disconnect", () => {
  //-- Enviar mensaje inicial
  socket.send(`${username}, abandonó el chat!`);
}); 

// Enviar un mensaje al chat cuando se presiona el botón "Enviar"
const enviarMensaje = () => {
  const mensajeInput = document.getElementById("mensaje-input");
  const mensaje = mensajeInput.value;
  socket.emit("nuevo mensaje", mensaje);
  mensajeInput.value = "";
};

// Mostrar un nuevo mensaje en la pantalla
const agregarMensaje = (mensaje) => {
  const chat = document.getElementById("chat");
  const mensajeDiv = document.createElement("div");
  mensajeDiv.textContent = mensaje;
  chat.appendChild(mensajeDiv);
};

socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

// Mostrar el nombre del usuario en la pantalla
const nombreUsuario = document.createElement("div");
nombreUsuario.textContent = `Bienvenido al chat, ${username}!`;
document.body.appendChild(nombreUsuario);

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

// Escuchar cuando un nuevo mensaje es recibido
socket.on("nuevo mensaje", (mensaje) => {
  agregarMensaje(mensaje);
});

// Escuchar cuando se conecta un nuevo usuario
socket.on("usuario conectado", (usuario) => {
  agregarMensaje(`${usuario} se ha conectado al chat`);
});

// Escuchar cuando se desconecta un usuario
socket.on("usuario desconectado", (usuario) => {
  agregarMensaje(`${usuario} se ha desconectado del chat`);
});
