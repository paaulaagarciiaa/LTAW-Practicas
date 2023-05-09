//-- Elementos del interfaz
const display = document.getElementById('display');
const msg_entry = document.getElementById('msg_entry');

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Escuchar cuando un nuevo mensaje es recibido
socket.on('nuevo mensaje', (mensaje) => {
  display.innerHTML += '<p><strong>' + mensaje.remitente + ': </strong>' + mensaje.mensaje + '</p>';
});

//-- Escuchar cuando un nuevo usuario se conecta al chat
socket.on('usuario conectado', (usuario) => {
  display.innerHTML += '<p style="color:green">' + usuario + ' se ha conectado al chat</p>';
});

//-- Escuchar cuando un usuario se desconecta del chat
socket.on('usuario desconectado', (usuario) => {
  display.innerHTML += '<p style="color:red">' + usuario + ' se ha desconectado del chat</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value) {
    //-- Enviar el mensaje al servidor
    socket.emit('nuevo mensaje', msg_entry.value);
    
    //-- Borrar el mensaje actual
    msg_entry.value = '';
  }
};
