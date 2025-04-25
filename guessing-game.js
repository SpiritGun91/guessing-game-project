import * as readline from "node:readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let secretNumber;

const checkGuess = (num) => {
	if (Number(num) > secretNumber) {
		console.log("Too high");
		return false;
	}
	if (Number(num) < secretNumber) {
		console.log("Too low");
		return false;
	}
	console.log("Correct!");
	return true;
};

const askGuess = () => {
	rl.question("Enter a guess: ", (answer) => {
		const num = Number.parseInt(answer);
		if (Number.isNaN(num)) {
			console.log("Invalid input");
			askGuess();
		} else {
			if (checkGuess(num)) {
				console.log("You win!");
				rl.close();
			} else {
				askGuess();
			}
		}
	});
};

const randomInRange = (min, max) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled)) + minCeiled;
};

const askRange = () => {
	rl.question("Enter a min number: ", (answer) => {
		const min = Number.parseInt(answer);
		if (Number.isNaN(min)) {
			console.log("Invalid input");
			askRange();
		} else {
			rl.question("Enter a max number: ", (max) => {
				const maxNum = Number.parseInt(max);
				if (Number.isNaN(maxNum) || maxNum <= min) {
					console.log("Invalid input");
					askRange();
				} else {
					secretNumber = randomInRange(min, maxNum);
					console.log(`I'm thinking of a number between ${min} and ${maxNum}`);
					askGuess();
				}
			});
		}
	});
};

askRange();
