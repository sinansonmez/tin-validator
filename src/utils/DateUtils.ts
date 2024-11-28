const JANUARY = 1
const DECEMBER = 12

const isLeapYear = (year: number): boolean => {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const getLastDayOfMonth = (month: number, year: number): number => {
	const lastDayOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return month === 2 && isLeapYear(year) ? 29 : lastDayOfMonth[month]
}

export const validate = (year: number, month: number, day: number): boolean => {
	if (month >= JANUARY && month <= DECEMBER) {
		return day >= 1 && day <= getLastDayOfMonth(month, year)
	}
	return false
}
