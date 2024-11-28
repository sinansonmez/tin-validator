import { validateDate } from "../utils/DateUtils";
import { isFollowLength, isFollowPattern } from "../utils/StringUtils";

const LENGTH_1 = 9;
const PATTERN_1 = "[0-5]\\d[0156]\\d[0-3]\\d{4}";
const LENGTH_2 = 10;
const PATTERN_2 = "\\d{2}[01235678]\\d[0-3]\\d{5}";

export const validate = (tin: string): number => {
  const normalizedTIN = tin.replace('/', '');
  
  if (!isFollowLength(normalizedTIN, LENGTH_1) && !isFollowLength(normalizedTIN, LENGTH_2)) {
    return 4;
  } else {
    return !isFollowPatterns(normalizedTIN) ? 3 : 2;
  }
}

function isFollowYearRuleAlgo1(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 2));
    return year >= 0 && year < 54;
  } catch (error) {
    return false;
  }
}

function isFollowPatterns(tin: string): boolean {
  return (isFollowPattern1AndLength1(tin) && isFollowYearRuleAndValidDate(tin)) ||
         (isFollowPattern2AndLength2(tin) && isValidDate(tin));
}

function isFollowPattern1AndLength1(tin: string): boolean {
  return isFollowPattern(tin, PATTERN_1) && isFollowLength(tin, LENGTH_1);
}

function isFollowPattern2AndLength2(tin: string): boolean {
  return isFollowPattern2(tin) && isFollowLength(tin, LENGTH_2);
}

function isFollowYearRuleAndValidDate(tin: string): boolean {
  return isFollowYearRuleAlgo1(tin) && isValidDate(tin);
}

function isFollowPattern2(tin: string): boolean {
  try {
    const yearOfSample = parseInt(tin.substring(0, 2));
    const currentYear = new Date().getFullYear() % 100;
    
    if (yearOfSample >= 0 && yearOfSample <= currentYear) {
      return new RegExp(PATTERN_2).test(tin);
    } else {
      return (parseInt(tin.substring(0, 2)) >= 54) && new RegExp(PATTERN_2).test(tin);
    }
  } catch (error) {
    return false;
  }
}

function isValidDate(tin: string): boolean {
  try {
    const year = parseInt(tin.substring(0, 2));
    const month = parseInt(tin.substring(2, 4));
    const day = parseInt(tin.substring(4, 6));
    
    if (month >= 21 && month <= 32) {
      return validateDate(1900 + year, month - 20, day) || validateDate(2000 + year, month - 20, day);
    } else if (month >= 51 && month <= 62) {
      return validateDate(1900 + year, month - 50, day) || validateDate(2000 + year, month - 50, day);
    } else if (month >= 71 && month <= 82) {
      return validateDate(1900 + year, month - 70, day) || validateDate(2000 + year, month - 70, day);
    } else {
      return validateDate(1900 + year, month, day) || validateDate(2000 + year, month, day);
    }
  } catch (error) {
    return false;
  }
}

