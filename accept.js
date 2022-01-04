const makeRequest = require('./makeRequest').makeRequest

async function main(){
    let transfer={
        "id": "656ff07c-df68-11eb-b38b-02240218ee6d",
          "metadata": {
              "merchant_defined": "accepted"
          },
        "status": "accept"
      }
let curl=" https://sandboxapi.rapyd.net/v1/account/transfer/response"
    
    const cresult =await  makeRequest('POST', '/v1/account/transfer/response',curl, transfer);
    console.log(cresult)
}
main()





