import { isFollowLength, isFollowPattern } from "../utils/StringUtils";
import { validateDate } from "../utils/DateUtils"; // Assuming DateUtils.validate() can be imported.

const LENGTH = 11;
const PATTERN = "[1-6]\\d{2}[0-1]\\d[0-3]\\d{5}";

export const validateLT = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH)) {
    return 4;
  } else if (!isFollowPatternForLt(tin)) {
    return 3;
  } else {
    return !isFollowRules(tin) ? 1 : 0;
  }
};

const checkMonth = (tin: string): boolean => {
  const month = parseInt(tin.substring(3, 5), 10);
  return month > 0 && month < 13;
};

const checkDay = (tin: string): boolean => {
  const day = parseInt(tin.substring(5, 7), 10);
  return day > 0 && day < 32;
};

const isFollowPatternForLt = (tin: string): boolean => {
  return (
    isFollowPattern(tin, PATTERN) &&
    checkMonth(tin) &&
    checkDay(tin) &&
    isValidDate(tin)
  );
};

// todo check if duplicate
const isValidDate = (tin: string): boolean => {
  try {
    const day = parseInt(tin.substring(5, 7), 10);
    const month = parseInt(tin.substring(3, 5), 10);
    const year = parseInt(tin.substring(1, 3), 10);
    return (
      validateDate(1900 + year, month, day) ||
      validateDate(2000 + year, month, day)
    );
  } catch (error) {
    return false;
  }
};

const multiplyAccordingToWeight = (val: number, index: number): number => {
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  return val * weights[index];
};

const multiplyAccordingToWeight2 = (val: number, index: number): number => {
  const weights = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];
  return val * weights[index];
};

const isFollowRules = (tin: string): boolean => {
  let sum = 0;
  const c11 = parseInt(tin.substring(10), 10);

  for (let i = 0; i < 10; i++) {
    sum += multiplyAccordingToWeight(parseInt(tin.substring(i, i + 1), 10), i);
  }

  let remainderBy11 = sum % 11;
  if (remainderBy11 !== 10) {
    return c11 === remainderBy11;
  } else {
    let sum2 = 0;

    for (let i = 0; i < 10; i++) {
      sum2 += multiplyAccordingToWeight2(
        parseInt(tin.substring(i, i + 1), 10),
        i
      );
    }

    remainderBy11 = sum2 % 11;
    return remainderBy11 === 10 ? c11 === 0 : c11 === remainderBy11;
  }
};
