import { validate } from "../../algorithm/LT";
describe("LTAlgorithm", () => {
  describe("validate", () => {
    it("should return 4 for TINs with invalid length", () => {
      expect(validate("123456789")).toBe(4); // Invalid length
    });

    it("should return 3 for TINs that do not match the pattern", () => {
      expect(validate("12345678901")).toBe(3); // Invalid pattern
    });

    it("should return 1 for TINs that fail the rules check", () => {
      expect(validate("10101010001")).toBe(1); // Invalid rules
    });

    it("should return 0 for valid TINs", () => {
      expect(validate("10101010005")).toBe(0);
      expect(validate("33309240064")).toBe(0);
    });
  });
});
