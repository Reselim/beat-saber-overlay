function connect() {
	var socket = new WebSocket("ws://localhost:6557/socket");

	socket.addEventListener("open", () => {
		console.log("WebSocket opened")
	});

	socket.addEventListener("message", (event) => {
		var data = JSON.parse(event.data);
		var event = events[data.event];

		if (event) {
			event(data.status);
		}
	});

	socket.addEventListener("close", (event) => {
		console.log("Failed to connect to server, retrying in 3 seconds");
		setTimeout(connect, 3000);
	});
}

connect();