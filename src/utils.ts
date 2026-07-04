// helper functions for the validator

import {
	type IValidatorType,
	type ICheckSumChecker,
	type PrefixType,
	NRICPrefixes,
	FINPrefixes,
	type IDType,
} from "./interfaces";
import { match } from "ts-pattern";
// validator function
export function validate({ ...props }: Readonly<IValidatorType>) {
	if (typeof props.inputString !== "string") {
		return false;
	}

	// if not correct length, then return false
	if (props.inputString.length !== 9) {
		return false;
	}

	const checksumChar = props.inputString[8].toUpperCase(); // checksum char to check
	const digits = props.inputString
		.substring(0, 8)
		.slice(1, 8)
		.split("")
		.map(Number); // all the numbers
	if (digits.some(isNaN)) return false; // return empty string if there are invalid chars

	const expectedChecksum = getChecksumChar({
		prefix: props.inputString[0].toUpperCase() as PrefixType,
		idNumbers: digits,
		type: props.type,
	});

	return checksumChar === expectedChecksum;
}

// get the expected checksum character
export function getChecksumChar({
	prefix,
	idNumbers,
	type,
}: Readonly<ICheckSumChecker>): string | undefined {
	const weights = [2, 7, 6, 5, 4, 3, 2];
	const st = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
	const fg = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];
	const m = ["K", "L", "J", "N", "P", "Q", "R", "T", "U", "W", "X"];

	// multiply digits with the weights, offset, then modulus 11
	const sum = idNumbers.reduce(
		(acc, digit, idx) => acc + digit * weights[idx],
		0,
	);
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

	return expectedChar;
}

function generateByType(type: "NRIC" | "FIN") {
	const randomDigits = Array.from({ length: 7 }, () =>
		Math.floor(Math.random() * 10),
	).join("");

	const prefixes = type === "NRIC" ? NRICPrefixes : FINPrefixes;

	const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

	const checksum = getChecksumChar({
		prefix: randomPrefix,
		idNumbers: randomDigits.split("").map(Number),
		type,
	});

	return randomPrefix + randomDigits + checksum;
}

// generate ids for FIN or NRIC, or both (randomlys)
export function generateID({ type }: Readonly<{ type: IDType }>) {
	return match(type)
		.with("NRIC", () => generateByType("NRIC"))
		.with("FIN", () => generateByType("FIN"))
		.with("BOTH", () => generateByType(Math.random() < 0.5 ? "NRIC" : "FIN"))
		.exhaustive();
}
