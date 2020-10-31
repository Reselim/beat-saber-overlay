const ui = (() => {
	if (html_id["overlay"]) var main = document.getElementById("overlay");
	var now_bsr = null;

	const performance = (() => {
		if (html_id["rank"])       var rank = document.getElementById("rank");
		if (html_id["percentage"]) var percentage = document.getElementById("percentage");
		if (html_id["score"])      var score = document.getElementById("score");
		if (html_id["combo"])      var combo = document.getElementById("combo");
		if (html_id["miss"])       var miss = document.getElementById("miss");

		function format(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		return (data) => {
			if (html_id["score"]) score.innerText = format(data.score);
			if (html_id["combo"]) combo.innerText = data.combo;
			if (html_id["rank"])  rank.innerText = data.rank;
			if (html_id["miss"])  miss.innerText = data.missedNotes + data.hitBombs;
			if (html_id["percentage"]) {
				percentage.innerText = (data.currentMaxScore > 0 ? (Math.floor((data.score / data.currentMaxScore) * 1000) / 10) : 0) + "%";
			}
		}
	})();

	const timer = (() => {
		const radius = 30;
		const circumference = radius * Math.PI * 2;

		if (html_id["progress"])      var bar = document.getElementById("progress");
		if (html_id["song_time"])     var song_time = document.getElementById("song_time");

		var active = false;

		var began;
		var duration;
		var length_min;
		var length_sec;

		var display;

		function format(time) {
			var minutes = Math.floor(time / 60);
			var seconds = time % 60;

			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			return `${minutes}:${seconds}`;
		}

		function update(time) {
			time = time || Date.now();

			var delta = time - began;

			var progress = Math.floor(delta / 1000);
			var percentage = Math.min(delta / duration, 1);

			if (html_id["progress"]) bar.setAttribute("style", `stroke-dashoffset: ${(1 - percentage) * circumference}px`);

			// Minor optimization
			if (progress != display) {
				display = progress;
				if (html_id["song_time"]) song_time.innerText = format(progress);
			}
		}

		function loop() {
			if (active) {
				update();
				requestAnimationFrame(loop);
			}
		}

		return {
			start(time, length) {
				active = true;
				
				began = time;
				duration = length;

				length_min = Math.floor(duration / 1000 / 60);
				length_sec = Math.floor(duration / 1000) % 60;
				if (length_sec < 10) {
					length_sec = "0" + length_sec;
				}
				if (html_id["song_length"]) song_length.innerText = `${length_min}:${length_sec}`;

				loop();
			},

			pause(time) {
				active = false;

				update(time);
			},

			stop() {
				active = false;
				began = undefined;
				duration = undefined;
			}
		}
	})();

	const beatmap = (() => {
		if (html_id["image"])         var cover = document.getElementById("image");

		if (html_id["title"])         var title = document.getElementById("title");
		if (html_id["subtitle"])      var subtitle = document.getElementById("subtitle");
		if (html_id["artist"])        var artist = document.getElementById("artist");
		if (html_id["mapper_header"]) var mapper_header = document.getElementById("mapper_header");
		if (html_id["mapper"])        var mapper = document.getElementById("mapper");
		if (html_id["mapper_footer"]) var mapper_footer = document.getElementById("mapper_footer");

		if (html_id["difficulty"])    var difficulty = document.getElementById("difficulty");
		if (html_id["bpm"])           var bpm = document.getElementById("bpm");
		if (html_id["njs"])           var njs = document.getElementById("njs");
		if (html_id["njs_text"])      var njs_text = document.getElementById("njs_text");
		if (html_id["bsr"])           var bsr = document.getElementById("bsr");
		if (html_id["bsr_text"])      var bsr_text = document.getElementById("bsr_text");
		if (html_id["mod"])           var mod = document.getElementById("mod");
		if (html_id["pre_bsr"])       var pre_bsr = document.getElementById("pre_bsr");
		if (html_id["pre_bsr_text"])  var pre_bsr_text = document.getElementById("pre_bsr_text");
		var httpRequest = new XMLHttpRequest();
		
		function format(number) {
			if (Number.isNaN(number)) {
				return "NaN";
			}

			if (Math.floor(number) !== number) {
				return number.toFixed(2);
			}

			return number.toString();
		}

		return (data, time, mod_data) => {
			if (data.difficulty === "ExpertPlus") {
				data.difficulty = "Expert+";
			}

			if (html_id["image"])    cover.setAttribute("src", `data:image/png;base64,${data.songCover}`);

			if (html_id["title"])    title.innerText = data.songName;
			if (html_id["subtitle"]) subtitle.innerText = data.songSubName;
			if (html_id["bsr"])      bsr.innerText = '';
			if (html_id["bsr_text"]) bsr_text.innerText = '';
			pre_bsr_data = now_bsr;
			now_bsr = null;
			
			httpRequest.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200 && this.response) {
					now_bsr = this.response.key;
					if (html_id["bsr"])      bsr.innerText = this.response.key;
					if (html_id["bsr_text"]) bsr_text.innerText = bsr_text_org;
				}
			}
			
			if (bsr_display && data.songHash != null && data.songHash.match(/^[0-9A-F]{40}/i)) {
				httpRequest.open('GET', 'https://beatsaver.com/api/maps/by-hash/' + data.songHash.substr(0, 40), true);
				httpRequest.timeout = 5000;
				httpRequest.responseType = 'json';
				httpRequest.send(null);
			}
			
			if (html_id["artist"]) artist.innerText = data.songAuthorName;
			if (data.levelAuthorName) {
				if (html_id["mapper_header"]) mapper_header.innerText = mapper_header_org;
				if (html_id["mapper"])        mapper.innerText = data.levelAuthorName;
				if (html_id["mapper_footer"]) mapper_footer.innerText = mapper_footer_org;
			} else {
				if (html_id["mapper_header"]) mapper_header.innerText = "";
				if (html_id["mapper"])        mapper.innerText = "";
				if (html_id["mapper_footer"]) mapper_footer.innerText = "";
			}

			if (html_id["difficulty"]) difficulty.innerText = data.difficulty;
			if (html_id["bpm"]) bpm.innerText = format(data.songBPM);

			if (data.noteJumpSpeed) {
				if (html_id["njs"]) njs.innerText = format(data.noteJumpSpeed);
				if (html_id["njs_text"]) njs_text.innerText = njs_text_org;
			} else {
				if (html_id["njs"]) njs.innerText = "";
				if (html_id["njs_text"]) njs_text.innerText = "";
			}
			
			if (html_id["mod"]) {
				var mod_text = "";
				if (mod_data.instaFail === true)          mod_text += "IF,";
				if (mod_data.batteryEnergy === true)      mod_text += "BE,";
				if (mod_data.disappearingArrows === true) mod_text += "DA,";
				if (mod_data.ghostNotes === true)         mod_text += "GN,";
				if (mod_data.songSpeed === "Faster")      mod_text += "FS,";
				if (mod_data.songSpeed === "Faster")      mod_text += "SS,";
				if (mod_data.noFail === true)             mod_text += "NF,";
				if (mod_data.obstacles === false)         mod_text += "NO,";
				if (mod_data.noBombs === true)            mod_text += "NB,";
				if (mod_data.noArrows === true)           mod_text += "NA,";
				mod_text = mod_text.slice(0,-1);
				mod.innerText = mod_text;
			}
			
			if (pre_bsr_data === null) {
				if (html_id["pre_bsr"])      pre_bsr.innerText = "";
				if (html_id["pre_bsr_text"]) pre_bsr_text.innerText = "";
			} else {
				if (html_id["pre_bsr"])      pre_bsr.innerText = pre_bsr_data;
				if (html_id["pre_bsr_text"]) pre_bsr_text.innerText = pre_bsr_text_org;
			}

			timer.start(Date.now(), data.length);
		}
	})();

	return {
		hide() {
			if (html_id["overlay"]) main.classList.add("hidden");
		},

		show() {
			if (html_id["overlay"]) main.classList.remove("hidden");
		},

		performance,
		timer,
		beatmap
	}
})();
