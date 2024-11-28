import { isFollowLength, isFollowPattern } from "../utils/StringUtils";

const LENGTH = 9;
const PATTERN = "[0,9]\\d{7}[A-Z]";

export const validate = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH)) {
    return 4;
  } else if (!isFollowPattern(tin, PATTERN)) {
    return 3;
  } else {
    return !isFollowRules(tin) ? 1 : 0;
  }
};

const isFollowRules = (tin: string): boolean => {
  const c1 = parseInt(tin.charAt(0), 10);
  const c2 = parseInt(tin.charAt(1), 10);
  const c3 = parseInt(tin.charAt(2), 10);
  const c4 = parseInt(tin.charAt(3), 10);
  const c5 = parseInt(tin.charAt(4), 10);
  const c6 = parseInt(tin.charAt(5), 10);
  const c7 = parseInt(tin.charAt(6), 10);
  const c8 = parseInt(tin.charAt(7), 10);
  const c9 = tin.charAt(8);

  const evenPositionNumbersSum = c2 + c4 + c6 + c8;
  const recodedSum = recodeValue(c1) + recodeValue(c3) + recodeValue(c5) + recodeValue(c7);
  const remainderBy26 = (evenPositionNumbersSum + recodedSum) % 26;

  return String.fromCharCode(remainderBy26 + 65) === c9;
};

const recodeValue = (x: number): number => {
  switch (x) {
    case 0:
      return 1;
    case 1:
      return 0;
    case 2:
      return 5;
    case 3:
      return 7;
    case 4:
      return 9;
    case 5:
      return 13;
    case 6:
      return 15;
    case 7:
      return 17;
    case 8:
      return 19;
    case 9:
      return 21;
    default:
      return -1;
  }
};
