import { validate } from "../../algorithm/DK";

describe("DKAlgorithm", () => {
  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "123456789";
    const result = validate(invalidLengthTIN);
    expect(result).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "9912991234";
    const result = validate(invalidPatternTIN);
    expect(result).toBe(3);
  });

  test("should return 3 for TIN with invalid date", () => {
    const invalidDateTIN = "9912991234";
    const result = validate(invalidDateTIN);
    expect(result).toBe(3);
  });

  test("should return 1 for TIN that follows pattern but fails rules", () => {
    const invalidRuleTIN = "0101701234";
    const result = validate(invalidRuleTIN);
    expect(result).toBe(1);
  });

  test("should return 0 for valid TIN", () => {
    const validTIN = "010111-1113";
    const result = validate(validTIN);
    expect(result).toBe(0);
  });
});
