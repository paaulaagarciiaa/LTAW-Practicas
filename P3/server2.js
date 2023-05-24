//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8080;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido al chat de NERV' + '<p><a href="/chat2.html">¡Entra a chatear!</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
 //-- Si el mensaje comienza con un "/", se interpreta como un comando
 if (msg.split(":")[1]) {
    //-- Separar el comando y los argumentos (si los hay)
    const command = msg.split(":")[1];
    const argument = msg.split(":")[0];
    console.log(command);


  switch(command) {
    case "/help":
      socket.send("Comandos disponibles: /help, /list, /hello, /date");
      break;
    case "/list":
      socket.send("Usuarios conectados: " + io.engine.clientsCount);
      break;
    case "/hello":
      const user = argument || "desconocido"
      socket.send(`¡Hola ${user}!`);
      break;
    case "/date":
      const date = new Date().toLocaleDateString();
      socket.send("La fecha actual es: " + date);
      break;

    default:
      socket.send("Este comando no existe.Por favor, inténtalo de nuevo.");
      break;
  }
  }else {
  //-- Reenviar mensaje a todos los clientes conectados
  io.send(msg);
}
  });
});


//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);