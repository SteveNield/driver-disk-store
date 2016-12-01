var supportedCurrencies = {
    'GBP': 'en-GB'
}

module.exports.format = function(currency, amount){
    if(!supportedCurrencies.hasOwnProperty(currency)){
        return '#ERR#';
    }

    return (amount).toLocaleString(supportedCurrencies[currency], {
        style: "currency", currency: currency, minimumFractionDigits: 2});
}