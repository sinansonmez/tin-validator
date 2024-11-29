import { validateLV } from "../../algorithm/LV";

describe("validateLV LV", () => {
  test("validateLVs valid TIN with pattern 0", () => {
    expect(validateLV("32579461005")).toBe(0); // Assuming "32000000001" is a valid TIN for PATTERN_2
  });

  test("invalidateLVs TIN with incorrect length", () => {
    expect(validateLV("2902200198")).toBe(4); // Too short
    expect(validateLV("290220019851")).toBe(4); // Too long
  });

  test("invalidateLVs TIN with incorrect pattern", () => {
    expect(validateLV("49022001985")).toBe(3); // Invalid starting digit
    expect(validateLV("2902200198A")).toBe(3); // Non-numeric character
  });

  test("invalidateLVs TIN with invalid date", () => {
    expect(validateLV("31022001985")).toBe(3); // Invalid date (Feb 31)
    expect(validateLV("29021901985")).toBe(3); // Invalid date (Feb 29 on a non-leap year)
  });

  test("invalidateLVs TIN with invalid checksum", () => {
    expect(validateLV("29022001986")).toBe(1); // Assuming checksum is incorrect
  });
});
