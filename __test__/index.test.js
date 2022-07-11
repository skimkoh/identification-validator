import { validate } from "../src/NRICValidator";

describe("Testing NRIC", () => {
  it("Given a valid NRIC (starting with S) with type BOTH, should return true", () => {
    expect(validate({ inputString: "S1234567D" })).toBe(true);
  });

  it("Given a valid NRIC (starting with T) with type BOTH, should return true", () => {
    expect(validate({ inputString: "T1234567J" })).toBe(true);
  });

  it("Given an invalid NRIC with type BOTH, should return false", () => {
    expect(validate({ inputString: "S1234567Z" })).toBe(false);
  });

  it("Given an incomplete NRIC with type BOTH, should return false", () => {
    expect(validate({ inputString: "S12345" })).toBe(false);
  });

  it("Given a valid NRIC (starting with S) with type NRIC, should return true", () => {
    expect(validate({ inputString: "S1234567D", type: "NRIC" })).toBe(true);
  });

  it("Given a valid NRIC (starting with S) with type FIN, should return false", () => {
    expect(validate({ inputString: "S1234567D", type: "FIN" })).toBe(false);
  });
});

describe("Testing FIN", () => {
  it("Given a valid FIN (starting with F) with type BOTH, should return true", () => {
    expect(validate({ inputString: "F1234567N" })).toBe(true);
  });

  it("Given a valid FIN (starting with T) with type BOTH, should return true", () => {
    expect(validate({ inputString: "G1234567X" })).toBe(true);
  });

  it("Given an invalid FIN with type BOTH, should return false", () => {
    expect(validate({ inputString: "F1234567L" })).toBe(false);
  });

  it("Given an incomplete FIN with type BOTH, should return false", () => {
    expect(validate({ inputString: "F1234" })).toBe(false);
  });

  it("Given a valid FIN (starting with F) with type FIN, should return true", () => {
    expect(validate({ inputString: "F1234567N", type: "FIN" })).toBe(true);
  });

  it("Given a valid FIN (starting with F) with type NRIC, should return false", () => {
    expect(validate({ inputString: "F1234567N", type: "NRIC" })).toBe(false);
  });

  it("Given a valid FIN (starting with F) with type NRIC, should return false", () => {
    expect(validate({ inputString: "M1234567K" })).toBe(true);
  });
});
