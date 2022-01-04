const makeRequest = require('./makeRequest').makeRequest

async function main(){
    let transfer={
        "source_ewallet": "ewallet_6c70317eccd646e2e82e7d215aafb77e",
        "amount": 50,
        "currency": "USD",
        "destination_ewallet": "ewallet_5ecb82e0c11fabe1cd7d2dfebfb8fd78",
        "metadata":
           {
               "merchant_defined": true
           }
      }
let curl="https://sandboxapi.rapyd.net/v1/account/transfer"
    
    const cresult =await  makeRequest('POST', '/v1/account/transfer',curl, transfer);
    console.log(cresult)
}
main()