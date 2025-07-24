import { Validator } from "../src";

describe("Testing invalid IDs, should fail all", () => {
	it("Invalid array of IDs", () => {
		const invalidArgs = [null, undefined];
		// validator can take null / undefined, but should return false
		invalidArgs.forEach((item) => {
			expect(Validator.isValidId(item)).toEqual(false);
		});
	});

	it("Wrong format array of IDs", () => {
		const invalidIDs = [
			"XXX",
			"0000",
			"1234567N",
			"X",
			"111111111",
			"11111111D",
		];
		invalidIDs.forEach((item) => {
			expect(Validator.isValidId(item)).toEqual(false);
		});
	});
});

describe("Testing of FIN validation", () => {
	it("Given a valid FIN (starting with F), should return true", () => {
		expect(Validator.isValidFIN("F1234567N")).toBe(true);
	});

	it("Given a valid FIN (starting with T), should return true", () => {
		expect(Validator.isValidFIN("G1234567X")).toBe(true);
	});

	it("Given a invalid FIN, should return false", () => {
		expect(Validator.isValidFIN("F0000000N")).toBe(false);
	});
});

describe("Testing NRIC validation", () => {
	it("Given a valid NRIC (starting with S), should return true", () => {
		expect(Validator.isValidNRIC("S1234567D")).toBe(true);
	});

	it("Given a valid NRIC (starting with T), should return true", () => {
		expect(Validator.isValidNRIC("T2707225E")).toBe(true);
	});

	it("Given a invalid NRIC, should return false", () => {
		expect(Validator.isValidNRIC("T000005E")).toBe(false);
	});
});

describe("Testing of any ID validation", () => {
	it("Given a list of valid FIN / NRIC, should return true", () => {
		const validIDs = [
			"S8120815H",
			"T7028919E",
			"F0655884N",
			"F7863454P",
			"M7418327U",
			"G4707424Q",
		];
		validIDs.forEach((item) => {
			expect(Validator.isValidId(item)).toEqual(true);
		});
	});
});

describe("Testing generation", () => {
	it("Generated NRIC should be valid", () => {
		expect(Validator.isValidNRIC(Validator.generateNRIC())).toBe(true);
	});

	it("Generated FIN should be valid", () => {
		expect(Validator.isValidFIN(Validator.generateFIN())).toBe(true);
	});
});
