/*
*  This is the Remote controlled client
*/

$(document).ready(function() {
	var socket = new Socket();
	
	var log = $("#log ul"),
		status = $("#status"),
		nick = $("#nick"),
		cid = $("#cid"),
		last_coords = { lat: 0, lon: 0 , acc: 0},
		watchid;
	
	status.html("Connecting...");

	setInterval(function() { //wait for a commander to attach, then send last known coords
		if (cid.html() !== '') {
			socket.emit("coords", { cid: cid.html(), lat: last_coords.lat, lon: last_coords.lon, acc: last_coords.acc });
		}
	}, 5000); //TODO lower this once rate limit is implemented

	/* 
	* WebSockets
	*/
	    
    socket.on('connect', function() {
    	status.html("Connected.");

		if (navigator.geolocation) {
			watchid = navigator.geolocation.watchPosition(function(position) {   
					last_coords.lat = position.coords.latitude;
					last_coords.lon = position.coords.longitude;
				
					$("#geo_status").html(last_coords.lat +' '+ last_coords.lon +' '+ last_coords.acc);

					if (cid.html() !== '') {
						socket.emit("coords", { cid: cid.html(), lat: last_coords.lat, lon: last_coords.lon, acc: last_coords.acc});
					}
				}, function(err) {
					$("#geo_status").html("Error: see console.");
					console.dir(err);
				}, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });
		} else {
			$("#geo_status").html("Error: Unable to grab your current position.");
		}
	});
			
	socket.on('disconnect', function() {
		status.html("Disconnected.");
	});
	
	socket.on('nick', function(data) {
    	nick.html(data.nick);
	});

	socket.on('join', function(data) {
    	status.html("A Commander has connected to RC");
		cid.html(data.commander);
	});
	
	socket.on('quit', function(data) {
    	status.html(data.commander +" has quitted from RC");
	});

	// here you can trigger whatever you want, according to what is contained on data.msg
	socket.on("execute", function(data) {	
		log.append('<li>'+ data.msg +'</li>');
	});

});
