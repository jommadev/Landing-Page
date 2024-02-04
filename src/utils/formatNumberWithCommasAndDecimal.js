export function formatNumberWithCommasAndDecimal(number) {
	const formattedNumber = Number(number).toLocaleString('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});

	return formattedNumber.replace(/,/g, ',');
}

export function formatNumberWithCommasAndInt(number) {

    const integerPart = Math.round(Number(number)); 
    const formattedNumber = integerPart.toLocaleString('en-US');
    return formattedNumber;
}
