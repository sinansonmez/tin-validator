import { validateHU } from "../../algorithm/HU"; // Adjust the import path as necessary

describe("HUAlgorithm TIN Validation", () => {
  // Test valid TIN
  it("should return 0 for valid TIN", () => {
    const validTIN = "8123456778"; // Example of a valid TIN
    expect(validateHU(validTIN)).toBe(0); // 0 means valid
  });

  // Test TIN with incorrect length
  test("should return 4 for TIN with incorrect length", () => {
    const invalidLengthTIN = "812345678"; // 9 digits instead of 10
    expect(validateHU(invalidLengthTIN)).toBe(4); // 4 means length mismatch
  });

  // Test TIN with incorrect pattern (doesn't start with 8)
  test("should return 3 for TIN with incorrect pattern", () => {
    const invalidPatternTIN = "9123456789"; // Starts with 9 instead of 8
    expect(validateHU(invalidPatternTIN)).toBe(3); // 3 means pattern mismatch
  });

  // Test TIN with valid length and pattern but incorrect checksum
  test("should return 1 for TIN with valid length and pattern but incorrect checksum", () => {
    const invalidChecksumTIN = "8123456790"; // Checksum doesn't match
    expect(validateHU(invalidChecksumTIN)).toBe(1); // 1 means checksum mismatch
  });

  // Test TIN with valid length, pattern, and checksum
  test("should return 0 for valid TIN with correct checksum", () => {
    const validTINWithChecksum = "8071592153"; // This should be a valid TIN
    expect(validateHU(validTINWithChecksum)).toBe(0); // 0 means valid
  });
});
