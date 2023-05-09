const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//-- Mantener un registro de los usuarios conectados
const usuarios_conectados = new Set();

//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/chat.html">Test</a></p>');
  });

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  //-- Añadir el usuario a la lista de usuarios conectados
  usuarios_conectados.add(socket.id);

  //-- Notificar a todos los usuarios conectados que un nuevo usuario se ha unido
  io.emit('usuario conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');

    //-- Eliminar al usuario de la lista de usuarios conectados
    usuarios_conectados.delete(socket.id);

    //-- Notificar a todos los usuarios conectados que un usuario se ha desconectado
    io.emit('usuario desconectado', socket.id);
  });

  socket.on('nuevo mensaje', (mensaje) => {
    console.log('Nuevo mensaje recibido: ' + mensaje);

    //-- Enviar el mensaje a todos los usuarios conectados (excepto al remitente)
    socket.broadcast.emit('nuevo mensaje', {
      remitente: socket.id,
      mensaje: mensaje
    });
  });
});

server.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});