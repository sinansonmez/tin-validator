import { isFollowLength, isFollowPattern } from "../utils/StringUtils"

const LENGTH = 9;
const PATTERN = "\\d{9}"

export const validate = (tin: string): number => {
	if (!isFollowLength(tin, LENGTH)) {
		return 4
	} else if (!isFollowPatternAndNotAllZero(tin)) {
		return 3
	} else {
		return !isFollowRules(tin) ? 1 : 2
	}
}

const isFollowPatternAndNotAllZero = (tin: string): boolean => {
	return tin !== "000000000" && isFollowPattern(tin, PATTERN);
}

const isFollowRules = (tin: string): boolean => {
	const c1 = parseInt(tin.charAt(0))
	const c2 = parseInt(tin.charAt(1))
	const c3 = parseInt(tin.charAt(2))
	const c4 = parseInt(tin.charAt(3))
	const c5 = parseInt(tin.charAt(4))
	const c6 = parseInt(tin.charAt(5))
	const c7 = parseInt(tin.charAt(6))
	const c8 = parseInt(tin.charAt(7))
	const c9 = parseInt(tin.charAt(8))
	const total = c1 * Math.pow(2, 8) + c2 * Math.pow(2, 7) + c3 * Math.pow(2, 6) + c4 * Math.pow(2, 5) + c5 * Math.pow(2, 4) + c6 * Math.pow(2, 3) + c7 * Math.pow(2, 2) + c8 * 2
	const remainderBy11 = total % 11
	const remainderBy10 = remainderBy11 % 10
	return c9 === remainderBy10
}
