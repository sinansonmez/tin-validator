import { validate } from "../../algorithm/EL";

describe("ELAlgorithm", () => {
  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "12345678";
    expect(validate(invalidLengthTIN)).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "000000000";
    expect(validate(invalidPatternTIN)).toBe(3);
  });

  test("should return 1 for TIN that follows pattern but fails rules", () => {
    const invalidRuleTIN = "123456789";
    expect(validate(invalidRuleTIN)).toBe(1);
  });
});