// Importacion de modulos HTTP, FS, URL, PORT
const http = require('http'),

    url = require('url'),
	  fs = require('fs'),
	  port = 9000;


// Creacion del Servidor Web con sus respectivos argumentos
http.createServer((req, res) => {

	let q = url.parse(req.url, true),
	filename = '';
	
	if (q.pathname == '/') {
  		filename = 'tienda.html'
	
	}else{
  		filename = q.pathname.substr(1);
	};

	let extension = filename.split('.')[1],
		code = 200,
		mime = 'text/html';

	console.log('required: ' + filename)
	switch (extension) {
		case 'png':
		case 'jpg':
    case 'jpeg':
			mime = 'image/' + extension;
			break;

		case 'css':
		case 'html':
			mime = 'text/' + extension;
			break;

		case 'js':
		case 'json':
			mime = 'application/' + extension;
			break;
		
		default:
			code = 404;
			filename = 'error.html';
	}

	fs.readFile(filename, (err, data) => {
		if (err){
			res.writeHead(404, {'Content-Type': 'text/html'})
			return res.end('SUPER-ERROR: file not found');
		}

		res.writeHead(code, {'Content-Type': mime});
		res.write(data);
		return res.end();
	});
	
}).listen(port);

console.log('Port: ' + port);
console.log('Index URL: http://localhost:' + port + '/\n\n')