import { isFollowLength, isFollowPattern } from '../utils/StringUtils'
import { validateDate } from '../utils/DateUtils'

const LENGTH = 11;
const PATTERN = "[1-6]\\d{2}[0-1]\\d[0-3]\\d{5}";

export const validateEE = (tin: string): number => {
	if (!isFollowLength(tin, LENGTH)) {
		return 4
	} else if (isFollowPattern(tin, PATTERN) && isValidDate(tin)) {
		return !isFollowRules(tin) ? 1 : 0
	} else {
		return 3
	}
}

const isFollowRangeRule = (tin: string): boolean => {
	const range = parseInt(tin.substring(7, 10))
	return range > 0 && range < 711
}

const isFollowEstoniaRulePart2 = (tin: string): boolean => {
	const c = tin.split('').map(char => parseInt(char))
	const sum = c[0] * 3 + c[1] * 4 + c[2] * 5 + c[3] * 6 + c[4] * 7 + c[5] * 8 + c[6] * 9 + c[7] + c[8] * 2 + c[9] * 3
	const remainderBy11 = sum % 11
	if (remainderBy11 < 10) {
		return remainderBy11 === c[10]
	} else {
		return remainderBy11 === 10 && c[10] === 0
	}
}

const isFollowEstoniaRule = (tin: string): boolean => {
	const c = tin.split('').map(char => parseInt(char))
	const sum = c[0] + c[1] * 2 + c[2] * 3 + c[3] * 4 + c[4] * 5 + c[5] * 6 + c[6] * 7 + c[7] * 8 + c[8] * 9 + c[9]
	const remainderBy11 = sum % 11
	if (remainderBy11 < 10) {
		return remainderBy11 === c[10]
	} else {
		return remainderBy11 === 10 ? isFollowEstoniaRulePart2(tin) : false
	}
}

const isFollowRules = (tin: string): boolean => {
	return isFollowRangeRule(tin) && isFollowEstoniaRule(tin)
}

// todo: centralize in Date utils same in DK
const isValidDate = (tin: string): boolean => {
	try {
		const year = parseInt(tin.substring(1, 3))
		const month = parseInt(tin.substring(3, 5))
		const day = parseInt(tin.substring(5, 7))
		return validateDate(1900 + year, month, day) ||validateDate(2000 + year, month, day)
	} catch {
		return false
	}
}
