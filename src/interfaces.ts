export interface IValidatorType {
	/**
	 * the input string to validate
	 */
	inputString: string;
	/**
	 * to validate for which ID type, NRIC or FIN or both
	 */
	type: IDType;
}

export interface ICheckSumChecker {
	/**
	 * takes in the prefix of NRIC / FIN
	 */
	prefix: NRICPrefixType | FINPrefixType | PrefixType;
	/**
	 * refers to the numbers between the prefix and the checksum character
	 */
	idNumbers: number[];
	/**
	 * to validate for which ID type, NRIC or FIN or both
	 */
	type: IDType;
}

export interface IGenerateID {
	type: Exclude<IDType, "BOTH">;
}

// types required for the prefixes
export const NRICPrefixes = ["S", "T"] as const;
export type NRICPrefixType = (typeof NRICPrefixes)[number];

export const FINPrefixes = ["M", "F", "G"] as const;
export type FINPrefixType = (typeof FINPrefixes)[number];

export type PrefixType = NRICPrefixType & FINPrefixType;
export type IDType = "NRIC" | "FIN" | "BOTH";
