import { isFollowLength, isFollowPattern } from "../utils/StringUtils";
import { validateDate } from "../utils/DateUtils"

const LENGTH = 11;
const PATTERN = /^[0-3]\d[0-1]\d{3}[+-A]\d{3}[0-9A-Z]$/

export const validateTIN = (tin: string): number => {
	if (!isFollowLength(tin, LENGTH)) {
		return 4
	} else if (isFollowPattern(tin, PATTERN) && isValidDate(tin)) {
		return !isFollowFinlandRule(tin) ? 1 : 0
	} else {
		return 3
	}
}

const isFollowFinlandRule = (tin: string): boolean => {
	let number = parseInt(tin.substring(0, 6) + tin.substring(7, 10), 10)
	let remainderBy31 = number % 31
	let c11 = tin.charAt(10)
	return getMatch(remainderBy31) === c11
}

const getMatch = (number: number): string => {
	if (number < 10) {
		return number.toString()
	} else {
		switch (number) {
			case 10:
				return 'A'
			case 11:
				return 'B'
			case 12:
				return 'C'
			case 13:
				return 'D'
			case 14:
				return 'E'
			case 15:
				return 'F'
			case 16:
				return 'H'
			case 17:
				return 'J'
			case 18:
				return 'K'
			case 19:
				return 'L'
			case 20:
				return 'M'
			case 21:
				return 'N'
			case 22:
				return 'P'
			case 23:
				return 'R'
			case 24:
				return 'S'
			case 25:
				return 'T'
			case 26:
				return 'U'
			case 27:
				return 'V'
			case 28:
				return 'W'
			case 29:
				return 'X'
			case 30:
				return 'Y'
			default:
				return ' '
		}
	}
}

const isValidDate = (tin: string): boolean => {
	try {
		let day = parseInt(tin.substring(0, 2), 10)
		let month = parseInt(tin.substring(2, 4), 10)
		let year = parseInt(tin.substring(4, 6), 10)
		let c7 = tin.charAt(6)
		if (c7 === "+") {
			return validateDate(1800 + year, month, day)
		} else if (c7 === "-") {
			return validateDate(1900 + year, month, day)
		} else {
			return c7 === "A" ? validateDate(2000 + year, month, day) : false
		}
	} catch (e) {
		return false
	}
}
