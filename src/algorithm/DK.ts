import { isFollowLength, isFollowPattern } from "../utils/StringUtils";
import { validateDate } from "../utils/DateUtils";

const LENGTH = 10;
const PATTERN = /^[0-3]\d[0-1]\d{3}\d{4}$/;

export const validate = (tin: string): number => {
  const withoutHyphen = tin.replace("-", "");
  if (!isFollowLength(withoutHyphen, LENGTH)) {
    return 4;
  } else if (
    isFollowPattern(withoutHyphen, PATTERN) &&
    isValidDate(withoutHyphen)
  ) {
    return !isFollowDenmarkRule(withoutHyphen) ? 1 : 0;
  } else {
    return 3;
  }
};

const isFollowDenmarkRule = (tin: string): boolean => {
  const serialNumber = parseInt(tin.substring(6, 10), 10);
  const yearOfBirth = parseInt(tin.substring(4, 6), 10);
  if (
    yearOfBirth >= 37 &&
    yearOfBirth <= 57 &&
    serialNumber >= 5000 &&
    serialNumber <= 8999
  ) {
    return false;
  } else {
    const c1 = parseInt(tin.charAt(0), 10);
    const c2 = parseInt(tin.charAt(1), 10);
    const c3 = parseInt(tin.charAt(2), 10);
    const c4 = parseInt(tin.charAt(3), 10);
    const c5 = parseInt(tin.charAt(4), 10);
    const c6 = parseInt(tin.charAt(5), 10);
    const c7 = parseInt(tin.charAt(6), 10);
    const c8 = parseInt(tin.charAt(7), 10);
    const c9 = parseInt(tin.charAt(8), 10);
    const c10 = parseInt(tin.charAt(9), 10);
    const sum =
      c1 * 4 +
      c2 * 3 +
      c3 * 2 +
      c4 * 7 +
      c5 * 6 +
      c6 * 5 +
      c7 * 4 +
      c8 * 3 +
      c9 * 2;
    const remainderBy11 = sum % 11;
    if (remainderBy11 === 1) {
      return false;
    } else if (remainderBy11 === 0) {
      return c10 === 0;
    } else {
      return c10 === 11 - remainderBy11;
    }
  }
};

// todo: centralize in Date utils same in EE
const isValidDate = (tin: string): boolean => {
  try {
    const day = parseInt(tin.substring(0, 2), 10);
    const month = parseInt(tin.substring(2, 4), 10);
    const year = parseInt(tin.substring(4, 6), 10);
    return (
      validateDate(1900 + year, month, day) ||
      validateDate(2000 + year, month, day)
    );
  } catch (error) {
    return false;
  }
};
