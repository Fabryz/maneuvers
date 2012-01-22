/*
*  This is the Commander client
*/

$(document).ready(function() {
	var socket = new Socket();
	
	var message = $("#message"),
        nick = $("#nick"),
		status = $("#status"),
        controlled_id = $("#controlled_id");

	function success(position) {
		var s = document.getElementById("geo_status");

		if (s.className == 'success') {
			// not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
			return;
		}

		s.innerHTML = "Coordinates received.";
		s.className = 'success';

		var mapcanvas = document.createElement('div');
		mapcanvas.id = 'mapcanvas';
		mapcanvas.style.height = '400px';
		mapcanvas.style.width = '560px';

		document.getElementById('geo_map').appendChild(mapcanvas);

		var latlng = new google.maps.LatLng(position.lat, position.lon);
		//var latlng = new google.maps.LatLng(45.66629, 12.24207);
		var myOptions = {
			zoom: 19,
			center: latlng,
			mapTypeControl: true,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.HYBRID
		};
		var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

		var marker = new google.maps.Marker({
			position: latlng, 
			map: map, 
			title: "Remote is here! (at least within a "+ position.acc +" meter radius)"
		});
	}

	function error(msg) {
		var s = document.getElementById("geo_status");
		s.innerHTML = typeof msg == 'string' ? msg : "failed";
		s.className = 'fail';

		// console.log(arguments);
	}
		
	status.html("Connecting...");
	message.focus();
	
	message.keydown(function(e) {
		if (e.keyCode === 13) { // enter
			socket.emit("command", { msg: message.val(), from: nick.text(), to: controlled_id.text() });
			message.val('');
		}
	});


	/* 
	* WebSockets	
	*/
	    
    socket.on('connect', function() {
    	status.html("Connected.");
	});
			
	socket.on('disconnect', function() {
		status.html("Disconnected.");
	});
    
    socket.on('nick', function(data) {
    	nick.html(data.nick);
	});

	socket.on('coords', function(data) {
    	$("geo_status").html(data.lat +" "+ data.lon +" "+ data.acc);
		success(data);
	});
    
     socket.on('controlled_id', function(data) {
    	controlled_id.html(data.controlled_id);
	});
	
});
