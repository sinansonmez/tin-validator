import { isFollowLength, isFollowPattern } from "../utils/StringUtils";

const LENGTH = 10;
const PATTERN = "8\\d{9}";

export const validate = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH)) {
    return 4; // Length mismatch
  } else if (!isFollowPattern(tin, PATTERN)) {
    return 3; // Pattern mismatch
  } else {
    return !isFollowRules(tin) ? 1 : 0; // Validation rules mismatch
  }
};


const isFollowRules = (tin: string): boolean => {
  const c10 = parseInt(tin.charAt(9), 10); // Last digit
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    const c = parseInt(tin.charAt(i), 10);
    sum += c * (i + 1);
  }

  const remainderBy11 = sum % 11;
  return remainderBy11 === c10;
};
