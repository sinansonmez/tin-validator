import { validate } from "../../algorithm/ES";

describe("ESAlgorithm", () => {
  test("should return 3 for TIN with invalid length", () => {
    const invalidLengthTIN = "12345678";
    expect(validate(invalidLengthTIN)).toBe(3);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "000000000";
    expect(validate(invalidPatternTIN)).toBe(3);
  });

  test("should return 1 for TIN that follows pattern but fails rules", () => {
    const invalidRuleTIN = "12345678A";
    expect(validate(invalidRuleTIN)).toBe(1);
  });

  test("should return 0 for valid TIN", () => {
    const validTIN = "12345678Z";
    const validTIN1 = "X1234567L";
    const validTIN2 = "Z1234567R";
    const validTIN3 = "M2812345C";
    expect(validate(validTIN)).toBe(0);
    expect(validate(validTIN1)).toBe(0);
    expect(validate(validTIN2)).toBe(0);
    expect(validate(validTIN3)).toBe(0);
  });
});
