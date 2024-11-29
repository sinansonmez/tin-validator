import { validate } from "../../algorithm/LU";

describe("LUAlgorithm validate", () => {
  const invalidLengthTINs = [
    "200001015678",
    "20000101567890",
    // Add more invalid length TINs here if needed
  ];

  const invalidPatternTINs = [
    "2100010156789", // Year out of pattern
    "2000130156789", // Month out of pattern
    "2000013256789", // Day out of pattern
    // Add more invalid pattern TINs here if needed
  ];

  test("validates valid TINs", () => {
    expect(validate("1893120105732")).toBe(0);
  });

  test("returns 4 for TINs with invalid length", () => {
    invalidLengthTINs.forEach((tin) => {
      expect(validate(tin)).toBe(4);
    });
  });

  test("returns 3 for TINs with invalid pattern or date", () => {
    invalidPatternTINs.forEach((tin) => {
      expect(validate(tin)).toBe(3);
    });
  });

  test("returns 1 for TINs that do not follow rules", () => {
    expect(validate("2000010156781")).toBe(1);
  });
});
