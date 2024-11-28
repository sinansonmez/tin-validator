import { clearString } from '../utils/StringUtils';
import { validate as validateDate } from '../utils/DateUtils';

const LENGTH = "11";
const PATTERN = "\\d{2}[0-1]\\d[0-3]\\d{6}";

let resultDateValidation: number;

const validate = (tin: string): number => {
  const str = clearString(tin);
  
  if (!isFollowLength(str)) {
    return 4;
  } else {
    setResultDateValidation(isValidDate(str));
    if (isFollowPattern(str) && resultDateValidation !== 0) {
      return !isFollowRules(str) ? 1 : 0;
    } else {
      return 3;
    }
  }
};

const setResultDateValidation = (result: number): void => {
  resultDateValidation = result;
};

const isFollowRules = (tin: string): boolean => {
  return isFollowBelgiumRule1AndIsDateValid(tin) || isFollowBelgiumRule2AndIsDateValid(tin);
};

const isFollowBelgiumRule1AndIsDateValid = (tin: string): boolean => {
  return isFollowBelgiumRule1(tin) && (resultDateValidation === 1 || resultDateValidation === 3);
};

const isFollowBelgiumRule2AndIsDateValid = (tin: string): boolean => {
  return isFollowBelgiumRule2(tin) && resultDateValidation >= 2;
};

const isFollowLength = (tin: string): boolean => {
  return tin.length === 11;
};

const isFollowPattern = (tin: string): boolean => {
  const pattern = new RegExp(PATTERN);
  return pattern.test(tin);
};

const isFollowBelgiumRule1 = (tin: string): boolean => {
  const divisionRemainderBy97 = parseInt(tin.substring(0, 9)) % 97;
  return 97 - divisionRemainderBy97 === parseInt(tin.substring(9, 11));
};

const isFollowBelgiumRule2 = (tin: string): boolean => {
  const divisionRemainderBy97 = parseInt('2' + tin.substring(0, 9)) % 97;
  return 97 - divisionRemainderBy97 === parseInt(tin.substring(9, 11));
};

const isValidDate = (tin: string): number => {
  try {
    const year = parseInt(tin.substring(0, 2));
    const month = parseInt(tin.substring(2, 4));
    const day = parseInt(tin.substring(4, 6));

    if (day !== 0 && month !== 0 && (!validateDate(1900 + year, month, day) || !validateDate(2000 + year, month, day))) {
      if (validateDate(1900 + year, month, day)) {
        return 1;
      } else {
        return validateDate(2000 + year, month, day) ? 2 : 0;
      }
    } else {
      return 3;
    }
  } catch (e) {
    return 0;
  }
};

export { validate };
