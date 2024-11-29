import { validateTIN } from "../../algorithm/FI";

describe("FIAlgorithm", () => {
  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "12345678"; // TIN of length not 11
    expect(validateTIN(invalidLengthTIN)).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "1234567890X"; // Invalid pattern
    expect(validateTIN(invalidPatternTIN)).toBe(3);
  });

  test("should return 1 for TIN that follows pattern but fails rules", () => {
    const invalidRuleTIN = "010101-123X"; // TIN following pattern but failing Finland rule
    expect(validateTIN(invalidRuleTIN)).toBe(1);
  });

  test("should return 0 for valid TIN", () => {
    const validTIN = "131052-308T";
    expect(validateTIN(validTIN)).toBe(0);
  });

  test("should return 1 for TIN with invalid date", () => {
    const invalidDateTIN = "010113-123X"; // Invalid date for Finland TIN
    expect(validateTIN(invalidDateTIN)).toBe(1);
  });
});
