export function operatorImageClass(operatorName){
    if(operatorName==='robi'){
        return 'image-robi'
    }else if(operatorName==='grameenphone'){
        return 'image-grameenphone'
    }else if(operatorName==='banglalink'){
        return 'image-banglalink'
    }else if(operatorName==='airtel'){
        return 'image-airtel'
    }else if(operatorName==='skitto'){
        return 'image-skitto'
    }else if(operatorName==='taletalk'){
        return 'image-taletalk'
    }else{
        return ''
    }
}

export function verifyPaymentTitle(status, message){
    if(status === 'success'){
        if(message === 'Successful'){
            return {
                title: "Payment Successful",
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
                title: "Payment Successful",
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