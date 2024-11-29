import { isFollowLength, isFollowPattern } from "../utils/StringUtils";

const LENGTH_1 = 9;
const PATTERN_1 = "\\d{7}[a-wA-W]([a-iA-I]|W)";
const LENGTH_2 = 8;
const PATTERN_2 = "\\d{7}[a-wA-W]";

// Validate TIN function
export const validateIE = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH_1) && !isFollowLength(tin, LENGTH_2)) {
    return 4; // Length mismatch
  } else if ((!isFollowLength(tin, LENGTH_1) || isFollowPattern(tin, PATTERN_1)) && (!isFollowLength(tin, LENGTH_2) || isFollowPattern(tin, PATTERN_2))) {
    return !isFollowRules(tin) ? 1 : 0; // Rules mismatch
  } else {
    return 3; // Pattern mismatch
  }
};

// Check if TIN follows rules
const isFollowRules = (tin: string): boolean => {
  const c1 = parseInt(tin.charAt(0), 10);
  const c2 = parseInt(tin.charAt(1), 10);
  const c3 = parseInt(tin.charAt(2), 10);
  const c4 = parseInt(tin.charAt(3), 10);
  const c5 = parseInt(tin.charAt(4), 10);
  const c6 = parseInt(tin.charAt(5), 10);
  const c7 = parseInt(tin.charAt(6), 10);
  const c8 = tin.length >=  8 ? letterToNumber(tin.charAt(7)) : parseInt(tin.charAt(7), 10);
  const c9 = tin.length >= 9 ? letterToNumber(tin.charAt(8)) : 0;
  const c8Bis = tin.charAt(7);

  const sum = (c9 * 9 + c1 * 8 + c2 * 7 + c3 * 6 + c4 * 5 + c5 * 4 + c6 * 3 + c7 * 2);
  const remainderBy23 = sum % 23;

  if (remainderBy23 !== 0) {
    return (c8 === letterToNumber('A') + remainderBy23 - 1 || c8 === letterToNumber('a') + remainderBy23 - 1);
  } else {
    return c8Bis === 'W' || c8Bis === 'w';
  }
};

// Convert letter to number
const letterToNumber = (toConv: string): number => {
  if (toConv !== 'W' && toConv !== 'w') {
    const a = parseInt('A', 36);
    return parseInt(toConv, 36) - a + 1;
  } else {
    return 0;
  }
};
