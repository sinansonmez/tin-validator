import { validateIT } from "../../algorithm/IT";

describe("ITAlgorithm", () => {
  describe("validateIT", () => {
    it("should return 4 if the TIN does not follow the correct length", () => {
      const invalidTin = "12345";
      expect(validateIT(invalidTin)).toBe(4);
    });

    it("should return 3 if the TIN does not follow the pattern", () => {
      const invalidTin = "1231231234567890";
      expect(validateIT(invalidTin)).toBe(3);
    });

    it("should return 0 if the TIN is valid", () => {
      const validTin = "DMLPRY77D15H501F";
      const validTin1 = "DOEJCK80T12H501J";
      expect(validateIT(validTin)).toBe(0);
      expect(validateIT(validTin)).toBe(0);
    });

    it("should return 1 if the TIN does not follow rules", () => {
      const invalidTin = "DMLPRY77D15H581F"; // Simulate a rule violation
      expect(validateIT(invalidTin)).toBe(1);
    });
  });
});
