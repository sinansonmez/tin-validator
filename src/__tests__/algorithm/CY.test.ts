import { validateCY } from "../../algorithm/CY";

describe("CYAlgorithm", () => {
  // Valid TIN that follows the correct pattern, length, and rules
  test("should return 0 for valid TIN", () => {
    const validTIN = "00123123T";
    const result = validateCY(validTIN);
    expect(result).toBe(0);
  });

  test("should return 0 for another valid TIN", () => {
    const validTIN = "99652156X";
    const result = validateCY(validTIN);
    expect(result).toBe(0);
  });

  // Invalid TIN that follows the correct length and pattern but fails the rules
  test("should return 1 for TIN that fails the rules", () => {
    const invalidRuleTIN = "00111111T"; // Example TIN that follows length/pattern but fails the rule
    const result = validateCY(invalidRuleTIN);
    expect(result).toBe(1);
  });

  // Invalid TIN that does not follow the correct length
  test("should return 4 for TIN that does not follow the correct length", () => {
    const invalidLengthTIN = "12345678"; // Invalid length TIN
    const result = validateCY(invalidLengthTIN);
    expect(result).toBe(4);
  });

  // Invalid TIN that does not follow the correct pattern
  test("should return 3 for TIN that does not follow the correct pattern", () => {
    const invalidPatternTIN = "12345678Z"; // Invalid TIN pattern
    const result = validateCY(invalidPatternTIN);
    expect(result).toBe(3);
  });

  // Edge case with boundary inputs
  test("should return 4 for TIN with incorrect length", () => {
    const shortTIN = "12345678"; // Length is not 9
    const longTIN = "12345678901"; // Length is not 9
    expect(validateCY(shortTIN)).toBe(4);
    expect(validateCY(longTIN)).toBe(4);
  });

  // Valid but incorrectly formatted TIN (fails pattern check)
  test("should return 3 for TIN that doesn’t match the pattern", () => {
    const invalidPatternTIN = "12345AB67"; // Invalid pattern (contains letters in wrong places)
    const result = validateCY(invalidPatternTIN);
    expect(result).toBe(3);
  });
});
