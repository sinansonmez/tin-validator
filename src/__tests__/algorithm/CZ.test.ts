import { validateCZ } from "../../algorithm/CZ";

describe("CZAlgorithm Validation", () => {
  // Valid TINs for both patterns
  test("should return 2 for a valid TIN following pattern 1 and length 1", () => {
    const validTIN = "710319/2745"; // Example TIN for pattern 1
    const result = validateCZ(validTIN);
    expect(result).toBe(2);
  });

  test("should return 2 for a valid TIN following pattern 2 and length 2", () => {
    const validTIN = "695622/0612"; // Example TIN for pattern 2
    const result = validateCZ(validTIN);
    expect(result).toBe(2);
  });

  // Invalid TINs
  test("should return 4 for an invalid TIN with incorrect length", () => {
    const invalidLengthTIN = "12345678"; // Invalid length
    const result = validateCZ(invalidLengthTIN);
    expect(result).toBe(4);
  });

  test("should return 3 for an invalid TIN with correct length but incorrect pattern", () => {
    const invalidPatternTIN = "999999999"; // Correct length but invalid pattern
    const result = validateCZ(invalidPatternTIN);
    expect(result).toBe(3);
  });

  test("should return 4 for an invalid TIN with incorrect length and pattern", () => {
    const invalidTIN = "99"; // Invalid length and pattern
    const result = validateCZ(invalidTIN);
    expect(result).toBe(4);
  });
});
