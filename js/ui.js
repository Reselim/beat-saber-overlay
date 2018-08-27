const ui = (() => {
	var main = document.getElementById("overlay");

	var rank = document.getElementById("rank");
	var percentage = document.getElementById("percentage");
	var score = document.getElementById("score");

	var cover = document.getElementById("cover");

	var title = document.getElementById("title");
	var subtitle = document.getElementById("subtitle");
	var artist = document.getElementById("artist");

	var difficulty = document.getElementById("difficulty");
	var bpm = document.getElementById("bpm");

	function format(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return {
		performance(data) {
			score.innerText = format(data.score);
			rank.innerText = data.rank;
			percentage.innerText = (data.currentMaxScore > 0 ? (Math.floor((data.score / data.currentMaxScore) * 1000) / 10) : 0) + "%";
		},

		beatmap(data) {
			if (data.difficulty === "ExpertPlus") {
				data.difficulty = "Expert+";
			}

			cover.setAttribute("src", "data:image/png;base64," + data.songCover);

			title.innerText = data.songName;
			subtitle.innerText = data.songSubName;
			artist.innerText = data.songAuthorName;

			difficulty.innerText = data.difficulty;
			bpm.innerText = data.songBPM + " BPM";
		},

		hide() {
			main.classList.add("hidden");
		},

		show() {
			main.classList.remove("hidden");
		}
	}
})();