/* export function quantity(itemPrice, totalAmount, inputAmount) {
  console.log(itemPrice, totalAmount, inputAmount)
    let ratio = itemPrice/totalAmount;
    ratio = ratio*inputAmount
    let quantity = parseInt(ratio/itemPrice)
    return quantity;
} */
export function quantity(itemPrice, totalProduct, inputAmount) {
    let ratio = inputAmount/totalProduct;
    let quantity = parseInt(ratio/itemPrice)
    return quantity;
}


  export function productValidationURL(router, datalength, productName) {
    if (datalength <= 0 || datalength==undefined) {
      if (productName === "stocks") {
        router.push('/stocks');
      } else if (productName === "bonds") {
        router.push('/bonds');
      } else if (productName === "investment-themes") {
        router.push('/investment-themes');
      } else if (productName === "mutual-funds") {
        router.push('/mutual-funds');
      } else {
        router.push('/home');
      }
    }
  }


  export function verifyTitle(status, message){
    if(status === 'success'){
        if(message === 'Successful'){
            return {
                title: "Thank You",
                details: null
            }
        }else{
            return {
                title: "Payment Failed",
                details: message
            }
        }
    }else if(status === 'failure'){
        return {
                title: "Payment Failed",
                details: message
            }
    
    }else if(status === 'ACCEPTED'){
        return {
                title: "Thank You",
                details: null
            }
    }else if(status === 'REJECTED'){
        return {
                title: "Payment Failed",
                details: null
            }
    }else if(status === 'cancel'){
        return {
                title: "Payment Cancelled",
                details: null
            }
    }
}


export function calculatePercentageCompletion(currentAmount, goalAmount) {
  if (currentAmount < 0 || goalAmount <= 0) {
    return "Invalid input";
  }

  const percentageCompletion = (currentAmount / goalAmount) * 100;
  const needMore = goalAmount - currentAmount
  return {
    percentageCompletion: percentageCompletion.toFixed(2),
    needMore: needMore < 0 ? 0 : needMore
  }
  
}

export function ipoDateFormat(dateString) {
  const date = new Date(dateString);
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
  return `${day < 10 ? '0' : ''}${day} ${monthName}`;
}

export function isDateOver(dueDate) {
  const currentDate = new Date();
  const dueDateObject = new Date(dueDate);
  return currentDate >= dueDateObject;
}