import { NegativeNumberException } from '../utils/Exceptions';

const sumDigit = (number: number): number => {
  console.log("number: ", number);
  
  if (number < 0) {
    throw new NegativeNumberException("Parameter has to be positive.");
  }

  const sNumber = number.toString();
  let sum = 0;

  for (let i = 0; i < sNumber.length; i++) {
    sum += Number(sNumber.charAt(i));
  }

  return sum;
};

const getNextTens = (number: number): number => {
  if (number < 0) {
    throw new NegativeNumberException("Parameter has to be positive.");
  }

  const sNumber = number.toString();
  if (sNumber.length === 1) {
    return 10;
  } else {
    const tens = Number(sNumber.charAt(0));
    return (tens + 1) * 10;
  }
};

const getUnit = (number: number): number => {
  if (number < 0) {
    throw new NegativeNumberException("Parameter has to be positive.");
  }

  const sNumber = number.toString();
  return Number(sNumber.charAt(sNumber.length - 1));
};

const isInRange = (
  value: number,
  minValue: number,
  maxValue: number
): boolean => {
  return value > minValue && value < maxValue;
};

const getMinValue = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error("Array cannot be empty");
  }
  let minValue = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < minValue) {
      minValue = numbers[i];
    }
  }

  return minValue;
};

export {
  sumDigit,
  getNextTens,
  getUnit,
  isInRange,
  getMinValue
};
