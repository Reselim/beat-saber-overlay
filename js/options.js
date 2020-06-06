const query = new URLSearchParams(location.search);
var performance_display = true;
var bsr_display = false;

(() => {
	const handlers = {
		modifiers(string) {
			string.split(",").forEach((modifier) => {
				if (modifier === "bsr") {
					bsr_display = true;
					return;
				}
				if (modifier === "no-performance") {
					performance_display = false;
					document.getElementById("rank").innerText = "";
					document.getElementById("percentage").innerText = "";
					document.getElementById("score").innerText = "";
					document.getElementById("combo").innerText = "";
					document.getElementById("combo_text").innerText = "";
					return;
				}
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