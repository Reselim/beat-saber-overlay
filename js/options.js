const query = new URLSearchParams(location.search);

(() => {
	const handlers = {
		modifiers(string) {
			string.split(",").forEach((modifier) => {
				var link = document.createElement("link");
				
				link.setAttribute("rel", "stylesheet");
				link.setAttribute("href", `./modifiers/${modifier}.css`);
		
				document.head.appendChild(link);
			});
		}
	};

	Object.keys(handlers).forEach((key) => {
		var value = query.get(key);

		if (value) {
			handlers[key](value);
		}
	});
	
	if (location.hash) {
		// Legacy URL hash support
		handlers.modifiers(location.hash.slice(1));
	}
})();