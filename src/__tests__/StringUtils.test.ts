import { clearString, isFollowLength, isFollowPattern, digitAt, removesCharacterAtPos, fillWith0UntilLength } from '../utils/StringUtils';

describe('clearString', () => {
	test('removes non-alphanumeric characters', () => {
		expect(clearString('abc123!@#')).toBe('abc123')
	})

	test('leaves alphanumeric characters intact', () => {
		expect(clearString('abc123')).toBe('abc123')
	})

	test('removes spaces', () => {
		expect(clearString('a b c 1 2 3')).toBe('abc123')
	})

	test('handles empty string', () => {
		expect(clearString('')).toBe('')
	})

	test('removes special characters', () => {
		expect(clearString('hello-world_123')).toBe('helloworld123')
	})

	test('removes unicode characters', () => {
		expect(clearString('hëllö-wörld_123')).toBe('hllwrld123')
	})
})

describe('isFollowLength', () => {
	test('returns true for string of exact length', () => {
		expect(isFollowLength('abc123', 6)).toBe(true)
	})

	test('returns false for string shorter than length', () => {
		expect(isFollowLength('abc', 5)).toBe(false)
	})

	test('returns false for string longer than length', () => {
		expect(isFollowLength('abcdefgh', 5)).toBe(false)
	})

	test('returns true for empty string and length 0', () => {
		expect(isFollowLength('', 0)).toBe(true)
	})

	test('returns false for empty string and non-zero length', () => {
		expect(isFollowLength('', 3)).toBe(false)
	})

	test('returns true for string with spaces of exact length', () => {
		expect(isFollowLength('a b c', 5)).toBe(true)
	})
})

describe('isFollowPattern', () => {
	test('returns true for matching pattern', () => {
		expect(isFollowPattern('abc123', '^[a-z]{3}[0-9]{3}$')).toBe(true)
	})

	test('returns false for non-matching pattern', () => {
		expect(isFollowPattern('abc1234', '^[a-z]{3}[0-9]{3}$')).toBe(false)
	})

	test('returns true for empty string with empty pattern', () => {
		expect(isFollowPattern('', '^$')).toBe(true)
	})

	test('returns false for non-empty string with empty pattern', () => {
		expect(isFollowPattern('abc', '^$')).toBe(false)
	})

	test('returns true for string with special characters in pattern', () => {
		expect(isFollowPattern('abc-123', '^[a-z]{3}-[0-9]{3}$')).toBe(true)
	})

	test('returns false for case-sensitive pattern mismatch', () => {
		expect(isFollowPattern('ABC123', '^[a-z]{3}[0-9]{3}$')).toBe(false)
	})

	test('returns true for pattern with wildcard', () => {
		expect(isFollowPattern('abc123xyz', '.*')).toBe(true)
	})
})

describe('digitAt', () => {
	test('returns correct digit for valid index', () => {
		expect(digitAt('12345', 0)).toBe(1)
		expect(digitAt('12345', 1)).toBe(2)
		expect(digitAt('12345', 4)).toBe(5)
	})

	test('returns NaN for non-numeric character', () => {
		expect(digitAt('abcde', 0)).toBeNaN()
		expect(digitAt('abc123', 0)).toBeNaN()
		expect(digitAt('abc123', 2)).toBeNaN()
	})

	test('returns NaN for index out of bounds', () => {
		expect(digitAt('12345', -1)).toBeNaN()
		expect(digitAt('12345', 5)).toBeNaN()
		expect(digitAt('12345', 10)).toBeNaN()
	})

	test('returns NaN for empty string', () => {
		expect(digitAt('', 0)).toBeNaN()
	})

	test('returns correct digit for string with leading zeros', () => {
		expect(digitAt('01234', 0)).toBe(0)
		expect(digitAt('01234', 1)).toBe(1)
		expect(digitAt('01234', 4)).toBe(4)
	})
})

describe('removesCharacterAtPos', () => {
	test('removes character at specified position', () => {
		expect(removesCharacterAtPos('hello', 'e', 1)).toBe('hllo')
		expect(removesCharacterAtPos('test', 's', 2)).toBe('tet')
        expect(removesCharacterAtPos('test', 't', 3)).toBe('tes')
	})

	test('returns original string if character at position does not match', () => {
		expect(removesCharacterAtPos('hello', 'a', 1)).toBe('hello')
		expect(removesCharacterAtPos('test', 'a', 2)).toBe('test')
	})

	test('returns original string if position is out of bounds', () => {
		expect(removesCharacterAtPos('hello', 'e', -1)).toBe('hello')
		expect(removesCharacterAtPos('hello', 'e', 5)).toBe('hello')
		expect(removesCharacterAtPos('hello', 'e', 10)).toBe('hello')
	})

	test('removes character at start position', () => {
		expect(removesCharacterAtPos('hello', 'h', 0)).toBe('ello')
	})

	test('removes character at end position', () => {
		expect(removesCharacterAtPos('hello', 'o', 4)).toBe('hell')
	})

	test('returns original string if empty', () => {
		expect(removesCharacterAtPos('', 'a', 0)).toBe('')
	})
})

describe('fillWith0UntilLength', () => {
	test('adds zeros to the beginning to reach the desired length', () => {
		expect(fillWith0UntilLength('123', 5)).toBe('00123')
		expect(fillWith0UntilLength('45', 4)).toBe('0045')
		expect(fillWith0UntilLength('7', 2)).toBe('07')
	})

	test('returns the same string if it is already the desired length', () => {
		expect(fillWith0UntilLength('12345', 5)).toBe('12345')
		expect(fillWith0UntilLength('abc', 3)).toBe('abc')
	})

	test('returns the same string if it is longer than the desired length', () => {
		expect(fillWith0UntilLength('123456', 5)).toBe('123456')
		expect(fillWith0UntilLength('abcdef', 3)).toBe('abcdef')
	})

	test('returns the same string if desired length is zero', () => {
		expect(fillWith0UntilLength('123', 0)).toBe('123')
	})

	test('handles an empty string correctly', () => {
		expect(fillWith0UntilLength('', 5)).toBe('00000')
		expect(fillWith0UntilLength('', 0)).toBe('')
	})
})
