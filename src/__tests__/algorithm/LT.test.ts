import { validateLT } from "../../algorithm/LT";
describe("LTAlgorithm", () => {
  describe("validateLT", () => {
    it("should return 4 for TINs with invalid length", () => {
      expect(validateLT("123456789")).toBe(4); // Invalid length
    });

    it("should return 3 for TINs that do not match the pattern", () => {
      expect(validateLT("12345678901")).toBe(3); // Invalid pattern
    });

    it("should return 1 for TINs that fail the rules check", () => {
      expect(validateLT("10101010001")).toBe(1); // Invalid rules
    });

    it("should return 0 for valid TINs", () => {
      expect(validateLT("10101010005")).toBe(0);
      expect(validateLT("33309240064")).toBe(0);
    });
  });
});
