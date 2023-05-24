//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8090;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi Chat!!!' + '<p><a href="/chat.html">Entrar al Chat</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVO USUARIO CONECTADO **'.yellow);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** USUARIO DESCONECTADO **'.yellow);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log(`Mensaje recibido!:` + msg.blue);
    const command = msg.split("/")[1];

switch (command) {
  case 'help':
    socket.send("Comandos soportados : /hello, /list, /hour y /date");
    break;

  case 'hello':
    socket.send('Bienvenido al chat!!!!');
  break;

  case 'list':
    const users = 'Número de usuarios conectados: ' + io.engine.clientsCount;
    socket.send(users);
    break;

  case 'hour':
    const currentTime = new Date();
    const timeString = 'Son las: ' + currentTime.toLocaleTimeString();
    socket.send(timeString);
  break;

  case 'date':
    const currentDate = new Date();
    const dateString = 'Hoy es: ' + currentDate.toLocaleDateString();
    socket.send(dateString);
    break;

  default:
    io.send(msg);
    break;
}
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);