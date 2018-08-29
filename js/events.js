const events = {
	hello() {
		console.log("Connected to Beat Saber")
	},

	songStart(data, time) {
		console.log(data, time);
		ui.show();
		ui.beatmap(data.beatmap, time);
		ui.performance(data.performance);
	},

	noteCut(data) { ui.performance(data.performance); },
	noteFullyCut(data) { ui.performance(data.performance); },
	obstacleEnter(data) { ui.performance(data.performance); },
	noteMissed(data) { ui.performance(data.performance); },
	bombCut(data) { ui.performance(data.performance); },

	pause(data, time) {
		ui.timer.pause(data.beatmap.paused + (Date.now() - time));
	},

	resume(data, time) {
		ui.timer.start(data.beatmap.start + (Date.now() - time), data.length);
	},

	menu() {
		ui.timer.stop();
		ui.hide();
	}
}