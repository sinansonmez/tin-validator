import { validateAT } from "../../algorithm/AT"; // Adjust the import according to your file structure
import { NegativeNumberException } from "../../utils/Exceptions"; // Assuming the exception class is imported

describe("validateTIN", () => {
  // Test case for valid TIN
  test("should return 0 for a valid TIN", () => {
    const validTIN = "931736581"; // Assuming this TIN is valid as per Austria rules 123456782
    expect(validateAT(validTIN)).toBe(0);

    const anotherValidTIN = "123456782";
    expect(validateAT(validTIN)).toBe(0);
  });

  // Test case for TIN with incorrect length
  test("should return 4 for a TIN with incorrect length", () => {
    const invalidLengthTIN = "12345"; // Too short
    expect(validateAT(invalidLengthTIN)).toBe(4);

    const invalidLengthLongTIN = "1234567890"; // Too long
    expect(validateAT(invalidLengthLongTIN)).toBe(4);
  });

  // Test case for TIN that doesn't follow the correct pattern
  test("should return 3 for a TIN that does not follow the correct pattern", () => {
    const invalidPatternTIN = "12345abc9"; // Contains non-digit characters
    expect(validateAT(invalidPatternTIN)).toBe(3);
  });

  // Test case for TIN that doesn't follow Austria-specific rule
  test("should return 1 for a TIN that does not follow the Austria-specific rule", () => {
    const invalidRuleTIN = "987654321"; // This should fail the Austria rule
    expect(validateAT(invalidRuleTIN)).toBe(1);
  });
});
