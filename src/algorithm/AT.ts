import { NegativeNumberException } from '../utils/Exceptions';
import { sumDigit, getUnit } from '../utils/NumberUtils';
import { clearString, isFollowLength, isFollowPattern } from '../utils/StringUtils';

// Constants
const PATTERN = "\\d{9}";
const LENGTH = 9;

// Validate function
export const validateTIN = (tin: string): number => {
  const normalizedTIN = clearString(tin);
  if (!isFollowLength(normalizedTIN, LENGTH)) {
    return 4;
  } else if (!isFollowPattern(normalizedTIN, PATTERN)) {
    return 3;
  } else {
    return !isFollowRules(normalizedTIN) ? 1 : 0;
  }
};

// Rule validation function
const isFollowRules = (tin: string): boolean => {
  return tin.length === 9 && isFollowAustriaRule(tin);
};

// Austria-specific rule validation
const isFollowAustriaRule = (tin: string): boolean => {
  const c1 = parseInt(tin.charAt(0), 10);
  const c2 = parseInt(tin.charAt(1), 10);
  const c3 = parseInt(tin.charAt(2), 10);
  const c4 = parseInt(tin.charAt(3), 10);
  const c5 = parseInt(tin.charAt(4), 10);
  const c6 = parseInt(tin.charAt(5), 10);
  const c7 = parseInt(tin.charAt(6), 10);
  const c8 = parseInt(tin.charAt(7), 10);
  const c9 = parseInt(tin.charAt(8), 10);

  try {
    const sum =
      c1 + c3 + c5 + c7 +
      sumDigit(c2 * 2) +
      sumDigit(c4 * 2) +
      sumDigit(c6 * 2) +
      sumDigit(c8 * 2);

    const check = getUnit(100 - sum);

    return c9 === check;
  } catch (error) {
    if (error instanceof NegativeNumberException) {
      return false;
    }
    throw error;
  }
};
