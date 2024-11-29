import { validate } from "../../algorithm/EE";

describe("EEAlgorithm", () => {
  test("should return 4 for TIN with invalid length", () => {
    const invalidLengthTIN = "1234567890";
    expect(validate(invalidLengthTIN)).toBe(4);
  });

  test("should return 3 for TIN with invalid pattern", () => {
    const invalidPatternTIN = "71234567890";
    expect(validate(invalidPatternTIN)).toBe(3);
  });

  test("should return 3 for TIN with invalid date", () => {
    const invalidDateTIN = "61123100000";
    expect(validate(invalidDateTIN)).toBe(3);
  });

  test("should return 1 for TIN that follows pattern but fails rules", () => {
    const invalidRuleTIN = "39912310001";
    expect(validate(invalidRuleTIN)).toBe(1);
  });

  test("should return 0 for valid TIN", () => {
    const validTIN = "39912310010";
    const validTIN1 = "37102250382";
    const validTIN2 = "32708101201";
    const validTIN3 = "46304280206";

    expect(validate(validTIN)).toBe(0);
    expect(validate(validTIN1)).toBe(0);
    expect(validate(validTIN2)).toBe(0);
    expect(validate(validTIN3)).toBe(0);
  });
});
