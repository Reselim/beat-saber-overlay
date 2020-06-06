const ui = (() => {
	var main = document.getElementById("overlay");

	const performance = (() => {
		var rank = document.getElementById("rank");
		var percentage = document.getElementById("percentage");
		var score = document.getElementById("score");
		var combo = document.getElementById("combo");

		function format(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		return (data) => {
			if (performance_display) {
				score.innerText = format(data.score);
				combo.innerText = data.combo;
				rank.innerText = data.rank;
				percentage.innerText = (data.currentMaxScore > 0 ? (Math.floor((data.score / data.currentMaxScore) * 1000) / 10) : 0) + "%";
			}
		}
	})();

	const timer = (() => {
		const radius = 30;
		const circumference = radius * Math.PI * 2;

		var bar = document.getElementById("progress");
		var text = document.getElementById("progress-text");

		var active = false;

		var began;
		var duration;

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

			bar.setAttribute("style", `stroke-dashoffset: ${(1 - percentage) * circumference}px`);

			// Minor optimization
			if (progress != display) {
				display = progress;
				text.innerText = format(progress);
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
		var cover = document.getElementById("image");

		var title = document.getElementById("title");
		var subtitle = document.getElementById("subtitle");
		var artist = document.getElementById("artist");

		var difficulty = document.getElementById("difficulty");
		var bpm = document.getElementById("bpm");
		var njs = document.getElementById("njs");
		var bsr = document.getElementById("bsr");
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

		return (data, time) => {
			if (data.difficulty === "ExpertPlus") {
				data.difficulty = "Expert+";
			}

			cover.setAttribute("src", `data:image/png;base64,${data.songCover}`);

			title.innerText = data.songName;
			subtitle.innerText = data.songSubName;
			bsr.innerText = '';
			
			httpRequest.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200 && this.response) {
					bsr.innerText = 'bsr ' + this.response.key;
				}
			}
			
			if (bsr_display && data.songHash != null && data.songHash.match(/^[0-9A-F]{40}/i)) {
				httpRequest.open('GET', 'https://beatsaver.com/api/maps/by-hash/' + data.songHash.substr(0, 40), true);
				httpRequest.timeout = 5000;
				httpRequest.responseType = 'json';
				httpRequest.send(null);
			}
			
			if (data.levelAuthorName) {
				artist.innerText = `${data.songAuthorName} [${data.levelAuthorName}]`;
			} else {
				artist.innerText = data.songAuthorName;
			}
			

			difficulty.innerText = data.difficulty;
			bpm.innerText = `${format(data.songBPM)} BPM`;

			if (data.noteJumpSpeed) {
				njs.innerText = `${format(data.noteJumpSpeed)} NJS`;
			} else {
				njs.innerText = "";
			}

			timer.start(Date.now(), data.length);
		}
	})();

	return {
		hide() {
			main.classList.add("hidden");
		},

		show() {
			main.classList.remove("hidden");
		},

		performance,
		timer,
		beatmap
	}
})();
