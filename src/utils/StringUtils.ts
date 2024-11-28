// todo check for any unused utility functions
const clearString = (str: string): string => {
	return str.replace(/[^a-zA-Z0-9]/g, '')
}

const isFollowLength = (str: string, length: number): boolean => {
	const regex = new RegExp(`^.{${length}}$`)
	return regex.test(str)
}

const isFollowPattern = (str: string, pattern: string): boolean => {
	const regex = new RegExp(pattern)
	return regex.test(str)
}

const digitAt = (str: string, index: number): number => {
	return parseInt(str.charAt(index), 10)
}

const removesCharacterAtPos = (s: string, c: string, pos: number): string => {
	if (pos <= s.length - 1) {
		const tmp = s.charAt(pos)
		if (tmp === c) {
			const prefix = pos <= s.length ? s.substring(0, pos) : ''
			const suffix = pos + 1 <= s.length - 1 ? s.substring(pos + 1) : ''
			return prefix + suffix
		}
	}
	return s
}

const fillWith0UntilLength = (tin: string, length: number): string => {
	let normalizedTIN = tin
	while (normalizedTIN.length < length) {
		normalizedTIN = '0' + normalizedTIN
	}
	return normalizedTIN
}

export {
	clearString,
	isFollowLength,
	isFollowPattern,
	digitAt,
	removesCharacterAtPos,
	fillWith0UntilLength
}
