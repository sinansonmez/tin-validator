import { validate } from "../../algorithm/CZ";

describe("CZAlgorithm Validation", () => {
  // Valid TINs for both patterns
  it("should return 2 for a valid TIN following pattern 1 and length 1", () => {
    const validTIN = "710319/2745"; // Example TIN for pattern 1
    const result = validate(validTIN);
    expect(result).toBe(2);
  });

  it("should return 2 for a valid TIN following pattern 2 and length 2", () => {
    const validTIN = "695622/0612"; // Example TIN for pattern 2
    const result = validate(validTIN);
    expect(result).toBe(2);
  });

  // Invalid TINs
  it("should return 4 for an invalid TIN with incorrect length", () => {
    const invalidLengthTIN = "12345678"; // Invalid length
    const result = validate(invalidLengthTIN);
    expect(result).toBe(4);
  });

  it("should return 3 for an invalid TIN with correct length but incorrect pattern", () => {
    const invalidPatternTIN = "999999999"; // Correct length but invalid pattern
    const result = validate(invalidPatternTIN);
    expect(result).toBe(3);
  });

  it("should return 4 for an invalid TIN with incorrect length and pattern", () => {
    const invalidTIN = "99"; // Invalid length and pattern
    const result = validate(invalidTIN);
    expect(result).toBe(4);
  });
});
