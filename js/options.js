const query = new URLSearchParams(location.search);
var bsr_display = false;
var disp_hidden = true;
var pre_bsr_data = null;
const check_id = ["overlay","rank","percentage","combo","score","progress","performance",
                  "image","title","subtitle","artist","difficulty","bpm","njs","bsr","bsr_text",
                  "mapper","mapper_header","mapper_footer","song_time","song_length","mod","miss",
                  "pre_bsr","pre_bsr_text","njs_text"]
var html_id = {};
for (var i = 0, len = check_id.length; i < len; ++i) {
	if (document.getElementById(check_id[i]) === null) {
		html_id[check_id[i]] = false;
	} else {
		html_id[check_id[i]] = true;
	}
}
if (html_id["mapper_header"]) var mapper_header_org = document.getElementById("mapper_header").textContent;
if (html_id["mapper_footer"]) var mapper_footer_org = document.getElementById("mapper_footer").textContent;
if (html_id["bsr_text"])      var bsr_text_org = document.getElementById("bsr_text").textContent;
if (html_id["pre_bsr_text"])  var pre_bsr_text_org = document.getElementById("pre_bsr_text").textContent;
if (html_id["njs_text"])      var njs_text_org = document.getElementById("njs_text").textContent;

(() => {
	const handlers = {
		modifiers(string) {
			string.split(",").forEach((modifier) => {
				if (modifier === "bsr") {
					bsr_display = true;
					return;
				}
				if (modifier === "no-hidden") {
					disp_hidden = false;
					return;
				}
				if (modifier === "no-performance") {
					if (html_id["performance"]) {
						var dom_obj = document.getElementById("performance");
						var dom_obj_parent = dom_obj.parentNode;
						dom_obj_parent.removeChild(dom_obj);
					}
					html_id["rank"] = false;
					html_id["percentage"] = false;
					html_id["score"] = false;
					html_id["combo"] = false;
					html_id["miss"] = false;
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