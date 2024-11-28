import { isFollowLength, isFollowPattern } from '../utils/StringUtils';
import { validateDate } from '../utils/DateUtils';  

const PATTERN = "\\d{10}";
const LENGTH = 10;

export const validate = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH)) {
    return 4;
  } else if (isFollowPattern(tin, PATTERN) && isValidDate(tin)) {
    return !isFollowBulgariaRule(tin) ? 1 : 0;
  } else {
    return 3;
  }
};

const isFollowBulgariaRule = (tin: string): boolean => {
  const digits = tin.split('').map(Number);  // Split the TIN string into an array of numbers

  const sum = digits[0] * 2 + digits[1] * 4 + digits[2] * 8 + digits[3] * 5 +
    digits[4] * 10 + digits[5] * 9 + digits[6] * 7 + digits[7] * 3 + digits[8] * 6;
  const remainderBy11 = sum % 11;

  return remainderBy11 === 10 ? digits[9] === 0 : remainderBy11 === digits[9];
};

const isValidDate = (tin: string): boolean => {
  try {
    const year = parseInt(tin.substring(0, 2));
    const month = parseInt(tin.substring(2, 4));
    const day = parseInt(tin.substring(4, 6));

    if (month >= 21 && month <= 32) {
      return validateDate(1800 + year, month - 20, day);
    } else {
      return month >= 41 && month <= 52
        ? validateDate(2000 + year, month - 40, day)
        : validateDate(1900 + year, month, day);
    }
  } catch (e) {
    return false;
  }
};
