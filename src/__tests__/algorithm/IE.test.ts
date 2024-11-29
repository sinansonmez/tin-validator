import { validate } from "../../algorithm/IE"; // Adjust path as needed

describe("IEAlgorithm Validation", () => {
  test("should return 0 for valid TIN", () => {
    const validTIN = "1234567T";
    const validTIN1 = "1234567TW";
    const validTIN2 = "1234567TW";
    const validTIN3 = "1234577WW";
    const validTIN4 = "1234577IA";
    expect(validate(validTIN)).toBe(0);
    expect(validate(validTIN1)).toBe(0);
    expect(validate(validTIN2)).toBe(0);
    expect(validate(validTIN3)).toBe(0);
    expect(validate(validTIN4)).toBe(0);
  });

  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "12345";
    expect(validate(invalidLengthTIN)).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "912345678";
    expect(validate(invalidPatternTIN)).toBe(3);
  });

  test("should return 1 for TIN with valid length and pattern but invalid rules", () => {
    const invalidRulesTIN = "1234567A";
    expect(validate(invalidRulesTIN)).toBe(1);
  });
});
