import { isFollowLength, isFollowPattern } from "../utils/StringUtils"
import { validateDate } from "../utils/DateUtils"
import { sumDigit } from "../utils/NumberUtils"

const D = [
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
	[2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
	[3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
	[4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
	[5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
	[6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
	[7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
	[8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
	[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
]

const P = [
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
	[1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
	[5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
	[8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
	[9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
	[4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
	[2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
	[7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
]

const LENGTH = 13;
const PATTERN = /^(1[89]|20)\d{2}(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])\d{5}$/;

const isValidDate = (tin: string): boolean => {
	try {
		const year = parseInt(tin.substring(0, 4))
		const month = parseInt(tin.substring(4, 6))
		const day = parseInt(tin.substring(6, 8))
		return validateDate(year, month, day)
	} catch {
		return false
	}
}

const isFollowLuxembourgRule1 = (tin: string): boolean => {
	const digits = tin.split("").map(Number)
	const sum =
		digits[1] +
		digits[3] +
		digits[5] +
		digits[7] +
		digits[9] +
		digits[11] +
		sumDigit(digits[0] * 2) +
		sumDigit(digits[2] * 2) +
		sumDigit(digits[4] * 2) +
		sumDigit(digits[6] * 2) +
		sumDigit(digits[8] * 2) +
		sumDigit(digits[10] * 2)
	console.log("check 1: ", sum % 10 === 0)
	return sum % 10 === 0
}

const isFollowLuxembourgRule2 = (tin: string): boolean => {
	const listNumbers: number[] = []

	for (let i = 12; i >= 0; i--) {
	  if (i !== 11) {
		listNumbers.push(Number(tin.charAt(i)))
	  }
	}
  
	let check = 0
  
	for (let i = 0; i < listNumbers.length; i++) {
	  check = D[check][P[i % 8][listNumbers[i]]]
	}
  
	return check === 0
}

const isFollowRules = (tin: string): boolean =>
	isFollowLuxembourgRule1(tin) && isFollowLuxembourgRule2(tin)

// todo align logic 78 always (!isFollowPattern(tin, PATTERN) || !isValidDate(tin)) return 3. everywhere
export const validate = (tin: string): number => {
	if (!isFollowLength(tin, LENGTH)) {
		return 4
	} else if (isFollowPattern(tin, PATTERN) && isValidDate(tin)) {
		return !isFollowRules(tin) ? 1 : 0
	} else {
		return 3
	}
}
