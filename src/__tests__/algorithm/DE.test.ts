import { validate } from "../../algorithm/DE";

describe("DEAlgorithm TIN Validation", () => {
  // Test: Invalid length (too short or too long)
  it("should return 4 for invalid length", () => {
    expect(validate("123456789")).toBe(4); // Invalid length (9 digits)
    expect(validate("123456789012")).toBe(4); // Invalid length (12 digits)
  });

  // Test: Invalid pattern but correct length
  it("should return 3 for invalid pattern", () => {
    expect(validate("00000000000")).toBe(3); // Invalid pattern for Germany TIN
    expect(validate("12345678901")).toBe(3); // Invalid pattern
  });

  // Test: Follows the length and pattern but fails the rules (Check digit)
  it("should return 1 for TIN that fails the rules", () => {
    expect(validate("12345678912")).toBe(1); // Fails check digit rule
  });

  // Test: Valid TIN
  it("should return 0 for a valid TIN", () => {
    // Here you'd provide a TIN that passes all checks
    expect(validate("26954371827")).toBe(0); // Passes all checks (length, pattern, rules)
  });

  // Test: Pattern 1 check (valid format but rule fails)
  it("should return 1 for TIN with valid pattern but rule failure", () => {
    expect(validate("12345678913")).toBe(1); // Example for pattern 1 but check digit fails
  });

  // Test: Pattern 2 check
  it("should return 0 for TIN that follows pattern 2 and rules", () => {
    expect(validate("86095742719")).toBe(0);
  });

  // Test: Rule Check for Germany TIN (both Rule 1 and Rule 2)
  it("should return 0 for TIN that follows the Germany rule 1", () => {
    expect(validate("65929970489")).toBe(0);
  });
});
