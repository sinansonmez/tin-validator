import { isFollowLength } from "../utils/StringUtils";

const LENGTH = 11;
const PATTERN_1 = "[1-9]\\d{10}";

export const validateDE = (tin: string): number => {
  const normalizedTIN = tin.replace("/", "");
  if (!isFollowLength(normalizedTIN, LENGTH)) {
    return 4;
  } else if (!isFollowPattern(normalizedTIN)) {
    return 3;
  } else {
    return !isFollowRules(normalizedTIN) ? 1 : 0;
  }
}

const isFollowPattern = (tin: string): boolean => {
  return isFollowPattern1(tin) || isFollowPattern2(tin);
}

const isFollowPattern1 = (tin: string): boolean => {
  if (!new RegExp(PATTERN_1).test(tin)) {
    return false;
  } else {
    const tab = Array.from(tin.slice(0, 10)).map(c => parseInt(c));
    const pos = new Array(10).fill(0);

    tab.forEach(num => pos[num]++);
    
    let isEncounteredTwice2 = false;
    let isEncountered0 = false;

    for (let i = 0; i < 10; i++) {
      if (pos[i] === 2) {
        if (isEncounteredTwice2) {
          return false;
        }
        isEncounteredTwice2 = true;
      }

      if (pos[i] === 0) {
        if (isEncountered0) {
          return false;
        }
        isEncountered0 = true;
      }
    }

    return isEncountered0;
  }
}

const isFollowPattern2 = (tin: string): boolean => {
  if (!new RegExp(PATTERN_1).test(tin)) {
    return false;
  } else {
    const tab = Array.from(tin.slice(0, 10)).map(c => parseInt(c));
    
    for (let i = 0; i < 8; i++) {
      if (tab[i] === tab[i + 1] && tab[i + 1] === tab[i + 2]) {
        return false;
      }
    }

    const pos = new Array(10).fill(0);
    tab.forEach(num => pos[num]++);

    let isEncounteredTwice2 = false;
    let isEncounteredThrice3 = false;

    for (let i = 0; i < 10; i++) {
      if (pos[i] > 3) {
        return false;
      }

      if (pos[i] === 3) {
        if (isEncounteredThrice3) {
          return false;
        }
        isEncounteredThrice3 = true;
      }

      if (pos[i] === 2) {
        if (isEncounteredTwice2) {
          return false;
        }
        isEncounteredTwice2 = true;
      }
    }

    return isEncounteredThrice3 || isEncounteredTwice2;
  }
}

const isFollowRules = (tin: string): boolean => {
  return tin.length === 11 && (isFollowRuleGermany1(tin) || isFollowRuleGermany2(tin));
}

const isFollowRuleGermany1 = (tin: string): boolean => {
  const c1 = parseInt(tin.charAt(0));
  const c = Array.from(tin.slice(1, 10)).map(c => parseInt(c));

  let result = (c1 + 10) % 10;
  if (result === 0) {
    result = 10;
  }

  result *= 2;
  let x = result % 11;

  for (let i = 0; i < 9; i++) {
    x = (x + c[i]) % 10;
    if (x === 0) {
      x = 10;
    }
    x *= 2;
    x %= 11;
  }

  const c11 = parseInt(tin.charAt(10));
  const total = 11 - x;
  return total === c11 || (total === 10 && c11 === 0);
}

const isFollowRuleGermany2 = (tin: string): boolean => {
  return parseInt(tin.charAt(10)) === calculateCheckDigit(tin);
}

const calculateCheckDigit = (tin: string): number => {
  let remainder_mod_ten = 0;
  let remainder_mod_eleven = 10;

  Array.from(tin.slice(0, 10)).forEach((char, counter) => {
    const digit = parseInt(char);
    remainder_mod_ten = (digit + remainder_mod_eleven) % 10;
    if (remainder_mod_ten === 0) {
      remainder_mod_ten = 10;
    }
    remainder_mod_eleven = 2 * remainder_mod_ten % 11;
  });

  let digit = 11 - remainder_mod_eleven;
  if (digit === 10) {
    digit = 0;
  }

  return digit;
}
