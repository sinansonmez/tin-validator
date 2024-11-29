import { isFollowLength, isFollowPattern } from "../utils/StringUtils"
import { validateDate } from "../utils/DateUtils"

const LENGTH_1 = 11
const PATTERN_1 = "[0-3]\\d[0-1]\\d{3}[0-2]\\d{4}"
const LENGTH_2 = 11
const PATTERN_2 = "[3][2]\\d{9}"

// todo this should be the structure for all validate functions
export const validateLV = (tin: string): number => {
	if (!isFollowLengthForLV(tin)) {
		return 4
	} else if (!isFollowPatternForLV(tin)) {
		return 3
	} else {
		return !isFollowLVRule(tin) ? 1 : 0
	}
}

const isFollowLengthForLV = (tin: string): boolean => {
	return isFollowLength(tin, LENGTH_1) || isFollowLength(tin, LENGTH_2)
}

const isFollowPatternForLV = (tin: string): boolean => {
	return (isFollowPattern(tin, PATTERN_1) && isValidDate(tin)) || isFollowPattern(tin, PATTERN_2)
}

const isFollowLVRule = (tin: string): boolean => {
	const c1 = parseInt(tin.charAt(0))
	const c2 = parseInt(tin.charAt(1))
	const c3 = parseInt(tin.charAt(2))
	const c4 = parseInt(tin.charAt(3))
	const c5 = parseInt(tin.charAt(4))
	const c6 = parseInt(tin.charAt(5))
	const c7 = parseInt(tin.charAt(6))
	const c8 = parseInt(tin.charAt(7))
	const c9 = parseInt(tin.charAt(8))
	const c10 = parseInt(tin.charAt(9))
	const checkDigit = parseInt(tin.charAt(10), 36)
	const sum = c1 * 1 + c2 * 6 + c3 * 3 + c4 * 7 + c5 * 9 + c6 * 10 + c7 * 5 + c8 * 8 + c9 * 4 + c10 * 2
	const remainderBy11 = sum % 11
    
	const result = 1 - remainderBy11 < -1 ? checkDigit === 1 - remainderBy11 + 11 : checkDigit === 1 - remainderBy11
    return result;
}

const isValidDate = (tin: string): boolean => {
	try {
		const day = parseInt(tin.substring(0, 2))
		const month = parseInt(tin.substring(2, 4))
		const year = parseInt(tin.substring(4, 6))
		const c7 = parseInt(tin.substring(6, 7))
		if (c7 === 0) {
			return validateDate(1800 + year, month, day)
		} else if (c7 === 1) {
			return validateDate(1900 + year, month, day)
		} else {
			return c7 === 2 ? validateDate(2000 + year, month, day) : false
		}
	} catch (error) {
		return false
	}
}
