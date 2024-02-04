export function validateDate(day, month, year) {
	const dobDate = new Date(year, month - 1, day);

	if (
		isNaN(dobDate.getDate()) ||
		dobDate.getDate() !== day ||
		dobDate.getMonth() !== month - 1 ||
		dobDate.getFullYear() !== year
	) {
		return false;
	}

	return true;
}
