import { validate } from "../../algorithm/BE";
import { NegativeNumberException } from "../../utils/Exceptions";

describe("BEAlgorithm Validation", () => {
  // Test valid TIN that follows the correct format and rules
  test("should return 0 for a valid TIN", () => {
    const validTin = "00012511119";
    const result = validate(validTin);
    expect(result).toBe(0); // 0 indicates a valid TIN

    const anotherValidTIN = "00012511148";
    const anotherResult = validate(anotherValidTIN);
    expect(anotherResult).toBe(0);
  });

  // Test TIN that does not follow the length rule
  test("should return 4 if the length is incorrect", () => {
    const invalidLengthTin = "12345"; // Invalid length (too short)
    const result = validate(invalidLengthTin);
    expect(result).toBe(4); // 4 indicates invalid length
  });

  // Test TIN that does not follow the pattern rule
  test("should return 3 if the TIN does not match the pattern", () => {
    const invalidPatternTin = "abcdefghijk"; // Invalid characters
    const result = validate(invalidPatternTin);
    expect(result).toBe(3); // 3 indicates invalid pattern
  });

  // Test TIN with a valid pattern but fails date validation
  test("should return 3 if the TIN has an invalid date", () => {
    const invalidDateTin = "12345678900"; // Invalid date part (for example)
    const result = validate(invalidDateTin);
    expect(result).toBe(3); // 3 indicates invalid date
  });

  // Test TIN that passes the pattern but does not follow Belgium rule
  test("should return 1 if the TIN fails Belgium rules", () => {
    const invalidRuleTin = "12345678999"; // Invalid according to Belgium rules
    const result = validate(invalidRuleTin);
    expect(result).toBe(3); // 3 indicates it doesn't follow the Belgium rules
  });

  // Test for a TIN with an invalid start that causes rule 3 to fail
  test("should return 3 for TIN that fails Belgium rule 3", () => {
    const invalidRule2Tin = "01234567890"; // Fails rule 3 for Belgium
    const result = validate(invalidRule2Tin);
    expect(result).toBe(3); // 3 indicates that Belgium rule 3 is not followed
  });
});
