import { generateID, validate } from "./utils";

export class Validator {
	// method to check if given string is a valid NRIC
	static isValidNRIC(value: string): boolean {
		return validate({ inputString: value?.trim(), type: "NRIC" });
	}

	// method to check if given string is a valid FIN
	static isValidFIN(value: string): boolean {
		return validate({ inputString: value?.trim(), type: "FIN" });
	}

	// method to check if given string is a valid NRIC / FIN. Useful for those fields that checks for generic IDs
	static isValidId(value: string): boolean {
		return validate({ inputString: value?.trim(), type: "BOTH" });
	}

	// checks whether the value has the expected NRIC structure, without validating its checksum
	static isLikelyNRIC(value: string): boolean {
		return typeof value === "string" && /^[ST]\d{7}[A-Z]$/i.test(value.trim());
	}

	// checks whether the value has the expected FIN structure, without validating its checksum
	static isLikelyFIN(value: string): boolean {
		return typeof value === "string" && /^[FGM]\d{7}[A-Z]$/i.test(value.trim());
	}

	// checks whether the value has the expected NRIC / FIN structure, without validating its checksum
	static isLikelyId(value: string): boolean {
		return (
			typeof value === "string" && /^[STFGM]\d{7}[A-Z]$/i.test(value.trim())
		);
	}

	// method to generate random NRIC
	static generateNRIC(): string {
		return generateID({ type: "NRIC" });
	}

	// method to generate random FIN
	static generateFIN(): string {
		return generateID({ type: "FIN" });
	}

	// method to generate random NRIC / FIN. Useful for those fields that checks for generic IDs
	static generateId(): string {
		return generateID({ type: "BOTH" });
	}
}
