import { clearString, digitAt, isFollowLength, isFollowPattern } from "../utils/StringUtils";

const PATTERN = "\\d{11}";
const LENGTH = 11;

export const validateHR = (tin: string): number => {
    const str = clearString(tin);
  
    if (!isFollowLength(str, LENGTH)) {
      return 4; // Length mismatch
    } else if (!isFollowPattern(str, PATTERN)) {
      return 3; // Pattern mismatch
    } else {
      return !isFollowRules(str) ? 1 : 0; // Validation rules mismatch
    }
  };
  
  // Function to check if the TIN follows the rules
  const isFollowRules = (tin: string): boolean => {
    let sum = digitAt(tin, 0) + 10;
    let rest = 0;
  
    for (let i = 1; i < 11; ++i) {
      const var7 = sum % 10;
      rest = (var7 === 0 ? 10 : var7) * 2 % 11;
      sum = rest + digitAt(tin, i);
    }
  
    const diff = 11 - rest;
    const lastDigit = digitAt(tin, 10);
  
    // Rule checking
    return rest === 1 && lastDigit === 0 || lastDigit === diff;
  };