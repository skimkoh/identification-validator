interface ValidatorType {
    inputString: string;
    type?: "NRIC" | "FIN" | "BOTH";
}
export declare function validate({ inputString, type }: ValidatorType): boolean;
export {};
