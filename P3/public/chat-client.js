//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const button = document.getElementById("button");
const username = prompt("Ingrese su nombre de usuario:");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

socket.on("connect", () => {
  //-- Enviar mensaje inicial
  socket.send(`${username} se unió al chat!`);
});

// Mostrar un nuevo mensaje en la pantalla
const agregarMensaje = (mensaje) => {
  const chat = document.getElementById("chat");
  const mensajeDiv = document.createElement("div");
  mensajeDiv.textContent = mensaje;
  chat.appendChild(mensajeDiv);
};

socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:black">' + msg + '</p>';
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

// Al cambiar el valor usuario
usuario.onchange = () => {
  if (usuario.value )
  // el usuario pasa a llamarse como se ha declarado
  User = usuario.value;
  console.log("nombre usuario"+ usuario.value);
  // Desaparece el display que te permite cambiar el nombre
  document.getElementById("user").style.display = "none";
  
}




