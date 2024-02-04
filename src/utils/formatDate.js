export function formatDateWithDate(dateString) {
	
		const date = new Date(dateString);
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const monthName = months[date.getMonth()];
		const day = date.getDate();
		const year = date.getFullYear();
		return `${day < 10 ? '0' : ''}${day} ${monthName}, ${year}`;

	
}

export function formatDate() {
	
	const date = new Date();
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	return `${day < 10 ? '0' : ''}${day} ${monthName}, ${year}`;

}
export function formatCapitalDate() {
	
	const date = new Date();
	const months = [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUN',
		'JUL',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC',
	];
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	return `${day < 10 ? '0' : ''}${day}-${monthName}-${year}`;

}

export function formatDateMDY(date) {
	const inputDate = new Date(date);
  
	const year = inputDate.getFullYear();
	const month = inputDate.getMonth() + 1;
	const day = inputDate.getDate();
	return `${month}/${day}/${year}`;
  }

