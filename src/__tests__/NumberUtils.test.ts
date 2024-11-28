import {
  sumDigit,
  getNextTens,
  getUnit,
  isInRange,
  getMinValue
} from "../utils/NumberUtils";

import { NegativeNumberException } from "../utils/Exceptions";

describe("sumDigit", () => {
  test("returns the sum of digits for a positive number", () => {
    expect(sumDigit(123)).toBe(6); // 1 + 2 + 3 = 6
    expect(sumDigit(987)).toBe(24); // 9 + 8 + 7 = 24
    expect(sumDigit(1001)).toBe(2); // 1 + 0 + 0 + 1 = 2
    expect(sumDigit(0)).toBe(0); // Single digit (0) sum is 0
  });

  test("throws NegativeNumberException for a negative number", () => {
    expect(() => sumDigit(-123)).toThrowError(NegativeNumberException);
    expect(() => sumDigit(-1)).toThrowError(
      new NegativeNumberException("Parameter has to be positive.")
    );
  });

  test("handles very large numbers correctly", () => {
    expect(sumDigit(1234567890)).toBe(45); // 1+2+3+4+5+6+7+8+9+0 = 45
  });

  test("handles single digit numbers correctly", () => {
    expect(sumDigit(7)).toBe(7); // Single digit sum is the number itself
    expect(sumDigit(9)).toBe(9);
  });
});

describe("getNextTens", () => {
  test("returns 10 for single-digit numbers", () => {
    expect(getNextTens(5)).toBe(10); // Single digit, should return 10
    expect(getNextTens(9)).toBe(10); // Single digit, should return 10
  });

  test("returns next multiple of 10 for multi-digit numbers", () => {
    expect(getNextTens(15)).toBe(20); // 1 -> (1 + 1) * 10 = 20
    expect(getNextTens(48)).toBe(50); // 4 -> (4 + 1) * 10 = 50
    expect(getNextTens(92)).toBe(100); // 9 -> (9 + 1) * 10 = 100
  });

  test("throws NegativeNumberException for negative numbers", () => {
    expect(() => getNextTens(-5)).toThrowError(NegativeNumberException);
    expect(() => getNextTens(-12)).toThrowError(
      new NegativeNumberException("Parameter has to be positive.")
    );
  });
});

describe("getUnit", () => {
  test("returns the unit (last digit) of a positive number", () => {
    expect(getUnit(123)).toBe(3); // Last digit is 3
    expect(getUnit(987)).toBe(7); // Last digit is 7
    expect(getUnit(1001)).toBe(1); // Last digit is 1
    expect(getUnit(0)).toBe(0); // Last digit is 0
  });

  test("throws NegativeNumberException for negative numbers", () => {
    expect(() => getUnit(-123)).toThrowError(NegativeNumberException);
    expect(() => getUnit(-1)).toThrowError(
      new NegativeNumberException("Parameter has to be positive.")
    );
  });

  test("handles single-digit numbers correctly", () => {
    expect(getUnit(7)).toBe(7); // Single digit, unit is the number itself
    expect(getUnit(9)).toBe(9); // Single digit, unit is the number itself
  });

  test("handles large numbers correctly", () => {
    expect(getUnit(9876543210)).toBe(0); // Last digit is 0
    expect(getUnit(1234567899)).toBe(9); // Last digit is 0
  });
});

describe("isInRange", () => {
  test("returns true if value is between minValue and maxValue", () => {
    expect(isInRange(5, 1, 10)).toBe(true); // 5 is between 1 and 10
    expect(isInRange(0, -10, 10)).toBe(true); // 0 is between -10 and 10
    expect(isInRange(100, 50, 200)).toBe(true); // 100 is between 50 and 200
  });

  test("returns false if value is equal to minValue or maxValue", () => {
    expect(isInRange(1, 1, 10)).toBe(false); // 1 is equal to minValue
    expect(isInRange(10, 1, 10)).toBe(false); // 10 is equal to maxValue
    expect(isInRange(-10, -10, 10)).toBe(false); // -10 is equal to minValue
    expect(isInRange(10, -10, 10)).toBe(false); // 10 is equal to maxValue
  });

  test("returns false if value is outside the range", () => {
    expect(isInRange(11, 1, 10)).toBe(false); // 11 is greater than maxValue
    expect(isInRange(-11, -10, 10)).toBe(false); // -11 is less than minValue
  });

  test("returns false if range is reversed (minValue > maxValue)", () => {
    expect(isInRange(5, 10, 1)).toBe(false); // Invalid range, min > max
    expect(isInRange(100, 200, 50)).toBe(false); // Invalid range, min > max
  });
});

describe("getMinValue", () => {
  test("returns the minimum value from an array of positive numbers", () => {
    expect(getMinValue([1, 2, 3, 4, 5])).toBe(1); // 1 is the smallest
    expect(getMinValue([10, 20, 30, 40, 50])).toBe(10); // 10 is the smallest
    expect(getMinValue([100, 200, 50, 300, 400])).toBe(50); // 50 is the smallest
  });

  test("returns the minimum value from an array of negative numbers", () => {
    expect(getMinValue([-1, -2, -3, -4, -5])).toBe(-5); // -5 is the smallest
    expect(getMinValue([-10, -20, -30, -40, -50])).toBe(-50); // -50 is the smallest
  });

  test("returns the single element when the array has only one element", () => {
    expect(getMinValue([5])).toBe(5); // Only one element, it is the min value
    expect(getMinValue([100])).toBe(100); // Only one element, it is the min value
  });

  test("returns the minimum value from an array of mixed positive and negative numbers", () => {
    expect(getMinValue([1, -2, 3, -4, 5])).toBe(-4); // -4 is the smallest
    expect(getMinValue([10, -20, 30, -40, 50])).toBe(-40); // -40 is the smallest
  });

  test("works with an array of zeros", () => {
    expect(getMinValue([0, 0, 0, 0, 0])).toBe(0); // All zeros, the min value is 0
  });

  test("throws an error if the array is empty", () => {
    expect(() => getMinValue([])).toThrowError("Array cannot be empty");
  });
});
