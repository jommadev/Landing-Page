export function ClientID(clientId) {
    let randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${clientId}${randomNumber}`;
}

export function calculatePercentage(amount, percentage) {
    const number = parseFloat(amount)
    if (typeof number !== 'number' || typeof percentage !== 'number') {
        throw new Error('Both arguments must be numbers');
    }

    if (percentage < 0 || percentage > 100) {
        throw new Error('Percentage must be between 0 and 100');
    }

    return (number * percentage) / 100;
}


import { createHash } from 'crypto';

export function generateAuthorizationHeader(appKey, secretKey) {
  const timestamp = Math.floor(Date.now() / 1000);
  const stringToEncode = `${appKey}:${createHash('md5').update(secretKey + timestamp).digest('hex')}`;
  const base64Encoded = Buffer.from(stringToEncode).toString('base64');
  return base64Encoded;
}

export function verifyTitle(status, message){
    if(status === 'success'){
        if(message === 'Successful'){
            return {
                title: "Prefund Successful",
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
                title: "Prefund Successful",
                details: null
            }
    }else if(status === 'REJECTED'){
        return {
                title: "Payment Failed",
                details: null
            }
    }else{
        return {
                title: "Payment Cancelled",
                details: null
            }
    }
}