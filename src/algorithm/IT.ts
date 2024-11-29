import { isFollowLength, isFollowPattern } from '../utils/StringUtils';
import { validateDate } from '../utils/DateUtils';
import italianId from "../utils/it_id.json";

const LENGTH = 16;
const PATTERN = '[a-zA-Z]{6}[LMNPQRSTUVlmnpqrstuv0-9]{2}[ABCDEHLMPRSTabcdehlmprst]([0Ll][1-9]|[1Mm2Nn4Qq5Rr6Ss][0-9]|[3Pp7Tt][0-1])[a-zA-Z][LMNPQRSTUVlmnpqrstuv0-9]{3}[a-zA-Z]';

export const validateIT = (tin: string): number => {
  if (!isFollowLength(tin, LENGTH)) {
    return 4;
  } else if (isFollowPatternForIt(tin) && isValidDate(tin)) {
    return !isFollowRuleItalia(tin) ? 1 : 0;
  } else {
    return 3;
  }
};

const isFollowPatternForIt = (tin: string): boolean => {
  const code = tin.substring(11, 12) + convertCharToNumber(tin.substring(12, 15));
  if (italianId.hasOwnProperty(code.toUpperCase())) {
    return isFollowPattern(tin, PATTERN);
  }
  return false
}

const isFollowRuleItalia = (tin: string): boolean => {
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    sum += i % 2 === 0 ? convertOddCharacter(tin.charAt(i)) : convertEvenCharacter(tin.charAt(i));
  }
  const remainderBy26 = sum % 26;
  const c16 = tin.charAt(15);
  return convertRemainder(remainderBy26) === c16.toUpperCase();
};

const convertEvenCharacter = (c: string): number => {
  if (/\d/.test(c)) {
    return parseInt(c, 10);
  } else if (/[a-z]/.test(c)) {
    return 0 + (c.charCodeAt(0) - 97);
  } else if (/[A-Z]/.test(c)) {
    return 0 + (c.charCodeAt(0) - 65);
  }
  return -1;
};

const convertOddCharacter = (c: string): number => {
  const normalizedChar = c.toUpperCase();
  switch (normalizedChar) {
    case '0': case 'A': return 1;
    case '1': case 'B': return 0;
    case '2': case 'C': return 5;
    case '3': case 'D': return 7;
    case '4': case 'E': return 9;
    case '5': case 'F': return 13;
    case '6': case 'G': return 15;
    case '7': case 'H': return 17;
    case '8': case 'I': return 19;
    case '9': case 'J': return 21;
    case 'K': return 2;
    case 'L': return 4;
    case 'M': return 18;
    case 'N': return 20;
    case 'O': return 11;
    case 'P': return 3;
    case 'Q': return 6;
    case 'R': return 8;
    case 'S': return 12;
    case 'T': return 14;
    case 'U': return 16;
    case 'V': return 10;
    case 'W': return 22;
    case 'X': return 25;
    case 'Y': return 24;
    case 'Z': return 23;
    default: return -1;
  }
};

const convertRemainder = (c: number): string => String.fromCharCode(65 + c);

const getMonthNumber = (m: string): number => {
  const upperM = m.toUpperCase();
  switch (upperM) {
    case 'A': return 1;
    case 'B': return 2;
    case 'C': return 3;
    case 'D': return 4;
    case 'E': return 5;
    case 'F': case 'G': case 'I': case 'J': case 'K': case 'N': case 'O': case 'Q': return -1;
    case 'H': return 6;
    case 'L': return 7;
    case 'M': return 8;
    case 'P': return 9;
    case 'R': return 10;
    case 'S': return 11;
    case 'T': return 12;
    default: return -1;
  }
};

const isValidDate = (tin: string): boolean => {
  try {
    const day = parseInt(convertCharToNumber(tin.substring(9, 11)), 10);
    const c9 = tin.charAt(8);
    const month = getMonthNumber(c9);
    const year = parseInt(convertCharToNumber(tin.substring(6, 8)), 10);
    if (day >= 1 && day <= 31) {
      return validateDate(1900 + year, month, day) || validateDate(2000 + year, month, day);
    } else if (day >= 41 && day <= 71) {
      return validateDate(1900 + year, month, day - 40) || validateDate(2000 + year, month, day - 40);
    }
    return false;
  } catch (e) {
    return false;
  }
};

const convertCharToNumber = (oldStr: string): string => {
  return oldStr.split('').map(c => (/[a-zA-Z]/.test(c) ? getNumberFromChar(c) : c)).join('');
};

const getNumberFromChar = (m: string): number => {
  const upperM = m.toUpperCase();
  switch (upperM) {
    case 'L': return 0;
    case 'M': return 1;
    case 'N': return 2;
    case 'P': return 3;
    case 'Q': return 4;
    case 'R': return 5;
    case 'S': return 6;
    case 'T': return 7;
    case 'U': return 8;
    case 'V': return 9;
    default: return -1;
  }
};
