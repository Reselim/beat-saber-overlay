if (location.hash) {
	var modifiers = location.hash.slice(1).split(",");

	modifiers.forEach((modifier) => {
		var link = document.createElement("link");
		
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./modifiers/" + modifier + ".css");

		document.head.appendChild(link);
	});
}