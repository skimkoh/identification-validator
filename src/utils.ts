// helper functions for the validator

import type { ValidatorType } from "./interfaces";

// validator function
export function validate({
	inputString,
	type = "BOTH",
}: Readonly<ValidatorType>) {
	// if not correct length, then return false
	if (inputString.length !== 9) {
		return false;
	}

	const prefix = inputString[0]; // get the first char for the series
	const digits = inputString.slice(1, 8).split("").map(Number); // all the numbers
	const checksumChar = inputString[8]; // checksum char to check

	if (digits.some(isNaN)) return false; // return if there are invalid chars
	const weights = [2, 7, 6, 5, 4, 3, 2];
	const st = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
	const fg = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];
	const m = ["K", "L", "J", "N", "P", "Q", "R", "T", "U", "W", "X"];

	// multiply digits with the weights, offset, then modulus 11
	const sum = digits.reduce((acc, digit, idx) => acc + digit * weights[idx], 0);
	const offset = prefix === "T" || prefix === "G" ? 4 : prefix === "M" ? 3 : 0;

	let checksumIndex = (sum + offset) % 11;

	// for M series, reverse the index
	if (prefix === "M") {
		checksumIndex = 10 - checksumIndex;
	}

	let expectedChar: string | undefined;

	if (type === "NRIC" || type === "BOTH") {
		if (prefix === "S" || prefix === "T") {
			expectedChar = st[checksumIndex];
		}
	}

	if (!expectedChar && (type === "FIN" || type === "BOTH")) {
		if (prefix === "F" || prefix === "G") {
			expectedChar = fg[checksumIndex];
		} else if (prefix === "M") {
			expectedChar = m[checksumIndex];
		}
	}

	return expectedChar === checksumChar;
}
