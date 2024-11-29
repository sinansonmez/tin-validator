import { validate } from "../../algorithm/MT";

describe("validate", () => {
  test("invalidates TINs with incorrect length", () => {
    expect(validate("12345")).toBe(4);
    expect(validate("123456789012")).toBe(4);
  });

  test("invalidates TINs with non-numeric characters in numeric positions", () => {
    expect(validate("12345A67A")).toBe(3);
    expect(validate("12A456789")).toBe(3);
  });

  test("invalidates TINs with incorrect structure", () => {
    expect(validate("1234567X")).toBe(3); // Assuming "1234567Z" fails structure rule
    expect(validate("-0000067m")).toBe(3); // Assuming "1234567m" fails structure rule
  });

  test("invalidates TINs with invalid checksum for length 9", () => {
    expect(validate("111234568")).toBe(1); // Assuming checksum is invalid
    expect(validate("229876544")).toBe(1); // Assuming checksum is invalid
  });

  test("invalidates TINs with invalid numerical range for structure rule 1", () => {
    expect(validate("0000000A")).toBe(3); // Assuming "0000000A" is invalid
  });

  test("invalidates TINs with invalid numerical range for structure rule 2", () => {
    expect(validate("3200132B")).toBe(3); // Assuming "3200132B" is invalid
  });
});
