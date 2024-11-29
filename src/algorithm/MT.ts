import { isFollowLength, isFollowPattern, fillWith0UntilLength } from "../utils/StringUtils"

const LENGTH_1 = 8;
const PATTERN_1 = "\\d{7}[MGAPLHBZmgaplhbz]"
const LENGTH_2 = 9;
const PATTERN_2 = "\\d{9}"

const isFollowPattern2 = (tin: string): boolean => {
	const c1 = parseInt(tin.charAt(0))
	const c2 = parseInt(tin.charAt(1))
	if (c1 !== 9 && c2 !== 9 && c1 !== 0 && c2 !== 0) {
		return c1 === c2 && isFollowPattern(tin, PATTERN_2)
	}
	return false
}

const isFollowStructureRuleMalta1 = (tin: string): boolean => {
	const c8 = tin.charAt(7)
	const cutTIN = tin.substring(0, 7)
	switch (c8) {
		case 'A':
		case 'P':
		case 'a':
		case 'p':
			return testTinRule1(cutTIN)
		case 'B':
		case 'G':
		case 'H':
		case 'L':
		case 'M':
		case 'Z':
		case 'b':
		case 'g':
		case 'h':
		case 'l':
		case 'm':
		case 'z':
			return testTinRule2(cutTIN)
		default:
			return false
	}
}

const testTinRule1 = (cutTIN: string): boolean => {
	const value = parseInt(cutTIN)
	return value >= 1 && value <= 9999999
}

const testTinRule2 = (cutTIN: string): boolean => {
	const value = parseInt(cutTIN.substring(0, 5))
	const totalValue = parseInt(cutTIN.substring(0, 7))
	return value >= 0 && value <= 32000 && totalValue !== 0
}

const isFollowRuleMalta2 = (tin: string): boolean => {
	const c1 = parseInt(tin.charAt(0))
	const c2 = parseInt(tin.charAt(1))
	const c3 = parseInt(tin.charAt(2))
	const c4 = parseInt(tin.charAt(3))
	const c5 = parseInt(tin.charAt(4))
	const c6 = parseInt(tin.charAt(5))
	const c7 = parseInt(tin.charAt(6))
	const checkDigit = parseInt(tin.substring(7))
	const sum = c1 * 27 + c2 * 32 + c3 * 16 + c4 * 8 + c5 * 4 + c6 * 2 + c7 * 1
	const remainderBy37 = sum % 37
	return checkDigit === 37 - remainderBy37
}

const isFollowRules = (tin: string): boolean => {
	return isFollowLength(tin, LENGTH_2) && isFollowRuleMalta2(tin)
}

const isFollowPatterns = (tin: string): boolean => {
	return isFollowLength1AndPattern1AndStructureRuleMalta(tin) || isFollowLength2AndPattern2(tin)
}

const isFollowLength1AndPattern1AndStructureRuleMalta = (tin: string): boolean => {
	return isFollowLength(tin, LENGTH_1) && isFollowPattern(tin, PATTERN_1) && isFollowStructureRuleMalta1(tin)
}

const isFollowLength2AndPattern2 = (tin: string): boolean => {
	return isFollowLength(tin, LENGTH_2) && isFollowPattern2(tin)
}

export const validate = (tin: string): number => {
	let normalizedTIN = ""
	try {
		normalizedTIN = fillWith0UntilLength(tin, LENGTH_1)
		if (!isFollowLength(tin, LENGTH_1) && !isFollowLength(tin, LENGTH_2)) {
			return 4
		}
		if (!isFollowPatterns(normalizedTIN)) {
			return 3
		}
	} catch (error) {
		return 4
	}

	if (!isFollowRules(tin)) {
		return isFollowLength(tin, LENGTH_1) ? 2 : 1
	}
	return 0
}
