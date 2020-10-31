const events = {
	hello(data, time) {
		console.log("Connected to Beat Saber");

		if (data.beatmap && data.performance) {
			ui.beatmap(data.beatmap, time, data.mod);
			ui.performance(data.performance);
			ui.show();
		}
	},

	songStart(data, time) {
		ui.beatmap(data.beatmap, time, data.mod);
		ui.performance(data.performance);
		ui.show();
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
		ui.timer.start(data.beatmap.start + (Date.now() - time), data.beatmap.length);
	},

	menu() {
		ui.timer.stop();
		if (disp_hidden) {
			ui.hide();
		}
	}
}