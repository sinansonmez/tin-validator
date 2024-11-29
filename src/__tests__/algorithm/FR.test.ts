import { validate } from "../../algorithm/FR";

describe("FRAlgorithm", () => {
  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "123456789012"; // TIN of length not 13
    expect(validate(invalidLengthTIN)).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "4535678901234"; // Invalid pattern
    expect(validate(invalidPatternTIN)).toBe(3);
  });

  test("should return 1 for TIN that follows pattern but fails rules", () => {
    const invalidRuleTIN = "1234567890123"; // TIN following pattern but failing France rule
    expect(validate(invalidRuleTIN)).toBe(1);
  });

  test("should return 0 for valid TIN", () => {
    const validTIN = "1234567890066"; // Replace with a valid TIN according to France rules
    expect(validate(validTIN)).toBe(0);
  });
});
