import { validate } from "../../algorithm/LV";

describe("validate LV", () => {
  test("validates valid TIN with pattern 0", () => {
    expect(validate("32579461005")).toBe(0); // Assuming "32000000001" is a valid TIN for PATTERN_2
  });

  test("invalidates TIN with incorrect length", () => {
    expect(validate("2902200198")).toBe(4); // Too short
    expect(validate("290220019851")).toBe(4); // Too long
  });

  test("invalidates TIN with incorrect pattern", () => {
    expect(validate("49022001985")).toBe(3); // Invalid starting digit
    expect(validate("2902200198A")).toBe(3); // Non-numeric character
  });

  test("invalidates TIN with invalid date", () => {
    expect(validate("31022001985")).toBe(3); // Invalid date (Feb 31)
    expect(validate("29021901985")).toBe(3); // Invalid date (Feb 29 on a non-leap year)
  });

  test("invalidates TIN with invalid checksum", () => {
    expect(validate("29022001986")).toBe(1); // Assuming checksum is incorrect
  });
});
