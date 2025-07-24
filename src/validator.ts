import { validate } from "./utils";

export class Validator {
	private value: string;

	private constructor(input: string) {
		this.value = input.toUpperCase();
	}

	get(): string {
		return this.value;
	}

	static isValidNRIC(value: string): boolean {
		return validate({ inputString: value.toUpperCase(), type: "NRIC" });
	}

	static isValidFIN(value: string): boolean {
		return validate({ inputString: value, type: "FIN" });
	}

	static isValidId(value: string): boolean {
		return validate({ inputString: value, type: "BOTH" });
	}
}
