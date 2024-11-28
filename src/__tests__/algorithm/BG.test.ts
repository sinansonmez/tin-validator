import { validate } from '../../algorithm/BG';

describe('BGAlgorithm validation', () => {

  // Test for invalid length
  it('should return 4 if TIN does not follow the correct length', () => {
    const result = validate('12345');  // TIN with length less than 10
    expect(result).toBe(4);  // Invalid length
  });

  // Test for invalid pattern (TIN with non-numeric characters)
  it('should return 3 if TIN does not match the correct pattern', () => {
    const result = validate('abcdefghij');  // Non-numeric TIN
    expect(result).toBe(3);  // Invalid pattern
  });

  // Test for invalid date (valid length and pattern but invalid date)
  it('should return 3 if TIN has an invalid date', () => {
    const invalidDateTIN = '1234000100';  // Example TIN that has an invalid date
    const result = validate(invalidDateTIN);
    expect(result).toBe(3);  // Invalid date
  });

  // Test for valid TIN but fails Bulgaria rule (valid length, pattern, and date but rule fails)
  it('should return 1 if TIN follows the correct length and pattern but fails the Bulgaria rule', () => {
    const invalidRuleTIN = '9203151234';  // Example TIN that follows length/pattern/date but fails the Bulgaria rule
    const result = validate(invalidRuleTIN);
    expect(result).toBe(1);  // Fails Bulgaria rule
  });

  // Test for valid TIN (valid length, pattern, date, and rule)
  it('should return 0 if TIN is valid according to all rules', () => {
    const validTIN = '7501010010';  // Example valid TIN following all rules
    const result = validate(validTIN);
    expect(result).toBe(0);  // Valid TIN
  });

  // Test for valid TIN 
  it('should return 0 if TIN is valid and year is 1990', () => {
    const validTIN = '9003150021';  // Example valid TIN 
    const result = validate(validTIN);
    expect(result).toBe(0);  // Valid TIN with valid date
  });

  // Test for valid TIN
  it('should return 0 if TIN is valid for another range', () => {
    const validTIN = '8407200036';
    const result = validate(validTIN);
    expect(result).toBe(0);  // Valid TIN with valid date
  });

  // Test for invalid date (invalid month in the range of 41-52)
  it('should return 3 if TIN has an invalid date with month in the 41-52 range', () => {
    const invalidDateTIN = '2016009999';  // Invalid TIN with month in the 41-52 range
    const result = validate(invalidDateTIN);
    expect(result).toBe(3);  // Invalid date
  });
});