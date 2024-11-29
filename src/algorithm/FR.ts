import { isFollowLength, isFollowPattern } from "../utils/StringUtils";

const LENGTH = 13;
const PATTERN = /^[0-3]\d{12}$/;

export const validateFR = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH)) {
    return 4;
  } else if (!isFollowPattern(tin, PATTERN)) {
    return 3;
  } else {
    return !isFollowRules(tin) ? 1 : 0;
  }
};

const isFollowRules = (tin: string): boolean => {
  let number = parseInt(tin.substring(0, 10), 10);
  
  let remainderBy511 = number % 511;
  let checkDigits = 0;
  if (remainderBy511 < 100) {
    checkDigits =
      remainderBy511 < 10
        ? parseInt(tin.charAt(12))
        : parseInt(tin.substring(11, 13));
  } else {
    checkDigits = parseInt(tin.substring(10, 13));
  }
  return remainderBy511 === checkDigits;
};
