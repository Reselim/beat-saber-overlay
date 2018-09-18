function connect() {
	var urlParams = new URLSearchParams(window.location.search);
	var ip = urlParams.get('ip') || "localhost";
	var socket = new WebSocket(`ws://${ip}:6557/socket`);

	socket.addEventListener("open", () => {
		console.log("WebSocket opened");
	});

	socket.addEventListener("message", (message) => {
		var data = JSON.parse(message.data);
		var event = events[data.event];

		if (event) {
			event(data.status, data.time);
		}
	});

	socket.addEventListener("close", () => {
		console.log("Failed to connect to server, retrying in 3 seconds");
		setTimeout(connect, 3000);
	});
}

connect();