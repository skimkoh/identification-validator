export interface IValidatorType {
	inputString: string;
	type: IDType;
}

export interface ICheckSumChecker {
	prefix: NRICPrefixType | FINPrefixType | PrefixType;
	idNumbers: number[];
	type: IDType;
}

export interface IGenerateID {
	type: Exclude<IDType, "BOTH">;
}

export const NRICPrefixes = ["S", "T"] as const;
export type NRICPrefixType = (typeof NRICPrefixes)[number];

export const FINPrefixes = ["M", "F", "G"] as const;
export type FINPrefixType = (typeof FINPrefixes)[number];

export type PrefixType = NRICPrefixType & FINPrefixType;
export type IDType = "NRIC" | "FIN" | "BOTH";
