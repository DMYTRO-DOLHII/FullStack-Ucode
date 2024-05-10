// Class timer
class Timer {
	constructor(title, delay, stopCount) {
		this.title = title;
		this.delay = delay;
		this.stopCount = stopCount;
		this.timerId = null;
	}

	start() {
		console.log(`Timer ${this.title} started (delay=${this.delay}, stopCount=${this.stopCount})`);
		this.timerId = setInterval(() => this.tick(), this.delay);
	}

	tick() {
		if (this.stopCount === 0) {
			this.stop();
			return;
		}
		console.log(`Timer ${this.title} Tick! | cycles left ${--this.stopCount}`);
	}

	stop() {
		clearInterval(this.timerId);
		console.log(`Timer ${this.title} stopped`);
	}
}

function runTimer(id, delay, counter) {
	const timer = new Timer(id, delay, counter);
	timer.start();
}

// Test case
runTimer("Bleep", 1000, 5);
