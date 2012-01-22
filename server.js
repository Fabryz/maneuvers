/*
* HTTP Server
*/

var express = require('express'),
	app = express.createServer(),
	remote_id;

// Configuration

app.configure(function() {
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.set('views', __dirname + '/views');

	app.use(express.logger(':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
	app.use(express.static(__dirname + '/public'));
	app.use(express.favicon());
});


app.get('/', function(req, res) {
    res.render('remote');
});

app.get('/rc/:remoteid', function(req, res) {
	
	remote_id = req.params.remoteid; // FIXME no actual checks if req.params.remoteid is reliable
	
	res.render('commander', { id: remote_id });
});

app.listen(8080);
console.log('* Server started on port '+ app.address().port +' with Node '+ process.version +', platform '+ process.platform +'.');

/*
* Web Sockets
*/

var io = require('socket.io').listen(app),
	remotes = [];
	
io.configure(function(){ 
	io.enable('browser client minification');
	//io.enable('browser client etag'); 
	io.set('log level', 1); 
	io.set('transports', [ 
			'websocket',
			'flashsocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling'
	]);
}); 


io.sockets.on('connection', function(client) {
	
	console.log('+ '+ client.id +' has connected');
	client.emit("nick", { nick: client.id });
	
	if (typeof remote_id !== 'undefined') {
		//console.dir(remote_id);
		
		io.sockets.sockets[remote_id].emit("join", { commander: client.id });
		
		console.log('# '+ client.id +' is now a Commander client');
		console.log('* '+ client.id +' is controlling '+ remote_id);
	} else {
		console.log('# '+ client.id +' is now a Remote client');
	}
	
	client.on("command", function(data) {		
		//console.dir(data);
		
		io.sockets.sockets[data.to].emit("execute", { msg: data.msg });
		console.log('> '+ client.id +' has sent "'+ data.msg +'" to '+ data.to);
	});

	client.on("coords", function(data) {		
		//console.dir(data);
		
		io.sockets.sockets[data.cid].emit("coords", { lat: data.lat, lon: data.lon, acc: data.acc});
	});

	client.on('disconnect', function() {
		
		if (typeof remote_id !== 'undefined') {
			console.log('* '+ client.id +' has stopped controlling '+ remote_id);
			io.sockets.sockets[remote_id].emit("quit", { commander: client.id });
		}
		
		console.log('- '+ client.id +' has disconnected');
	});
});

