import { validate } from '../utils/DateUtils'

describe('validate', () => {
	test('validates correct date in a non-leap year', () => {
		expect(validate(2023, 1, 31)).toBe(true) // January 31, 2023
		expect(validate(2023, 2, 28)).toBe(true) // February 28, 2023
		expect(validate(2023, 4, 30)).toBe(true) // April 30, 2023
		expect(validate(2023, 12, 31)).toBe(true) // December 31, 2023
	})

	test('invalidates dates outside the month range', () => {
		expect(validate(2023, 2, 30)).toBe(false) // Invalid February date
		expect(validate(2023, 4, 31)).toBe(false) // April only has 30 days
		expect(validate(2023, 6, 31)).toBe(false) // June only has 30 days
	})

	test('validates leap year date', () => {
		expect(validate(2024, 2, 29)).toBe(true) // Leap year, February 29, 2024
	})

	test('invalidates leap year date for non-leap years', () => {
		expect(validate(2023, 2, 29)).toBe(false) // February 29 does not exist in 2023
	})

	test('validates minimum and maximum days of the month', () => {
		expect(validate(2023, 1, 1)).toBe(true)  // January 1st
		expect(validate(2023, 12, 31)).toBe(true) // December 31st
	})

	test('invalidates invalid months', () => {
		expect(validate(2023, 0, 15)).toBe(false)  // Month 0 is invalid
		expect(validate(2023, 13, 15)).toBe(false) // Month 13 is invalid
	})

	test('invalidates invalid days', () => {
		expect(validate(2023, 1, 32)).toBe(false)  // January has 31 days
		expect(validate(2023, 12, 32)).toBe(false) // December has 31 days
	})
})
