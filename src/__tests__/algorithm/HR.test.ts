// Assuming your validate function is located in `tinValidator.ts` or similar file
import { validate } from "../../algorithm/HR";

describe("TIN Validation Tests", () => {
  // Test case for length mismatch
  test("should return 4 for TIN with incorrect length", () => {
    const invalidTIN = "12345";
    expect(validate(invalidTIN)).toBe(4); // Length mismatch
  });

  // Test case for pattern mismatch
  test("should return 3 for TIN with incorrect pattern", () => {
    const invalidTIN = "12345678abc";
    expect(validate(invalidTIN)).toBe(3); // Pattern mismatch
  });

  // Test case for rule mismatch (Invalid TIN according to the rule)
  test("should return 1 for TIN with valid length and pattern but invalid rule", () => {
    const validTin = "12345678901"; // Example of a TIN that follows pattern and length but fails rule
    expect(validate(validTin)).toBe(1); // Rule mismatch
  });

  // Test case for valid TIN
  test("should return 0 for valid TIN", () => {
    const validTin = "94577403194"; // Example of a valid TIN
    expect(validate(validTin)).toBe(0); // Valid TIN
  });
});
