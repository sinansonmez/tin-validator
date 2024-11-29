import { validateIE } from "../../algorithm/IE"; // Adjust path as needed

describe("IEAlgorithm Validation", () => {
  test("should return 0 for valid TIN", () => {
    const validTIN = "1234567T";
    const validTIN1 = "1234567TW";
    const validTIN2 = "1234567TW";
    const validTIN3 = "1234577WW";
    const validTIN4 = "1234577IA";
    expect(validateIE(validTIN)).toBe(0);
    expect(validateIE(validTIN1)).toBe(0);
    expect(validateIE(validTIN2)).toBe(0);
    expect(validateIE(validTIN3)).toBe(0);
    expect(validateIE(validTIN4)).toBe(0);
  });

  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "12345";
    expect(validateIE(invalidLengthTIN)).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "912345678";
    expect(validateIE(invalidPatternTIN)).toBe(3);
  });

  test("should return 1 for TIN with valid length and pattern but invalid rules", () => {
    const invalidRulesTIN = "1234567A";
    expect(validateIE(invalidRulesTIN)).toBe(1);
  });
});
