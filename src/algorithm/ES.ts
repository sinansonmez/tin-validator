import { fillWith0UntilLength, isFollowLength, isFollowPattern } from "../utils/StringUtils"

const tabConvertToChar = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']

const LENGTH = 9;
const PATTERN_1 = "\\d{8}[a-zA-Z]";
const PATTERN_2 = "[XYZKLMxyzklm]\\d{7}[a-zA-Z]";

export const validate = (tin: string): number => {
	let normalizedTIN = fillWith0(tin)
	if (!isFollowLength(normalizedTIN, LENGTH)) {
		return 4
	} else if (!isFollowPattern(normalizedTIN, PATTERN_1) && !isFollowPattern(normalizedTIN, PATTERN_2)) {
		return 3
	} else {
		return !isFollowRules(normalizedTIN) ? 1 : 0
	}
}

const isFollowRules = (tin: string): boolean => {
	return (isFollowPattern(tin, PATTERN_1) && isFollowESRule1(tin)) || (isFollowPattern(tin, PATTERN_2) && isFollowESRule2(tin))
}

const isFollowESRule1 = (tin: string): boolean => {
	try {
		let number = parseInt(tin.substring(0, tin.length - 1))
		let checkDigit = tin.charAt(tin.length - 1)
		let remainderBy23 = number % 23
		let sum = remainderBy23 + 1
		return checkDigit.toUpperCase() === getCharFromNumber(sum)
	} catch (e) {
		return false
	}
}

const isFollowESRule2 = (tin: string): boolean => {
	try {
		let c1 = getNumberFromChar(tin.charAt(0)).toString()
		let number = parseInt(c1 + tin.substring(1, tin.length - 1))
		let checkDigit = tin.charAt(tin.length - 1)
		let remainderBy23 = number % 23
		let sum = remainderBy23 + 1
		return checkDigit.toUpperCase() === getCharFromNumber(sum)
	} catch (e) {
		return false
	}
}

const getNumberFromChar = (m: string): number => {
	switch (m.toUpperCase()) {
		case 'K':
		case 'L':
		case 'M':
		case 'X':
			return 0
		case 'Y':
			return 1
		case 'Z':
			return 2
		default:
			return -1
	}
}

const getCharFromNumber = (sum: number): string => {
	return tabConvertToChar[sum - 1]
}

const fillWith0 = (tin: string): string => {
	return fillWith0UntilLength(tin, 9)
}
