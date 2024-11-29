import { validateMT } from "../../algorithm/MT";

describe("validateMT", () => {
  test("invalidateMTs TINs with incorrect length", () => {
    expect(validateMT("12345")).toBe(4);
    expect(validateMT("123456789012")).toBe(4);
  });

  test("invalidateMTs TINs with non-numeric characters in numeric positions", () => {
    expect(validateMT("12345A67A")).toBe(3);
    expect(validateMT("12A456789")).toBe(3);
  });

  test("invalidateMTs TINs with incorrect structure", () => {
    expect(validateMT("1234567X")).toBe(3); // Assuming "1234567Z" fails structure rule
    expect(validateMT("-0000067m")).toBe(3); // Assuming "1234567m" fails structure rule
  });

  test("invalidateMTs TINs with invalid checksum for length 9", () => {
    expect(validateMT("111234568")).toBe(1); // Assuming checksum is invalid
    expect(validateMT("229876544")).toBe(1); // Assuming checksum is invalid
  });

  test("invalidateMTs TINs with invalid numerical range for structure rule 1", () => {
    expect(validateMT("0000000A")).toBe(3); // Assuming "0000000A" is invalid
  });

  test("invalidateMTs TINs with invalid numerical range for structure rule 2", () => {
    expect(validateMT("3200132B")).toBe(3); // Assuming "3200132B" is invalid
  });
});
