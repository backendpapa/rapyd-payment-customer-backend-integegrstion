const makeRequest = require('./makeRequest').makeRequest

async function main(){
    let fund={
        "ewallet": "ewallet_6c70317eccd646e2e82e7d215aafb77e",
        "amount": "200",
        "currency": "USD",
        "metadata": {
        "merchant_defined": true
       }
    }
let curl="https://sandboxapi.rapyd.net/v1/account/deposit"
    
    const cresult =await  makeRequest('POST', '/v1/account/deposit',curl, fund);
    console.log(cresult)
}
main()