const events = {
	hello() {
		console.log("Connected to Beat Saber")
	},

	songStart(data) {
		console.log(data);
		ui.show();
		ui.beatmap(data.beatmap);
		ui.performance(data.performance);
	},

	noteFullyCut(data) {
		ui.performance(data.performance);
	},

	menu: ui.hide
}