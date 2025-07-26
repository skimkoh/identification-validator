import { generateID, validate } from "./utils";

export class Validator {
	// method to check if given string is a valid NRIC
	static isValidNRIC(value: string): boolean {
		return validate({ inputString: value, type: "NRIC" });
	}

	// method to check if given string is a valid FIN
	static isValidFIN(value: string): boolean {
		return validate({ inputString: value, type: "FIN" });
	}

	// method to check if given string is a valid NRIC / FIN. Useful for those fields that checks for generic IDs
	static isValidId(value: string): boolean {
		return validate({ inputString: value, type: "BOTH" });
	}

	// method to generate random NRIC
	static generateNRIC(): string {
		return generateID({ type: "NRIC" });
	}

	// method to generate random FIN
	static generateFIN(): string {
		return generateID({ type: "FIN" });
	}
}
