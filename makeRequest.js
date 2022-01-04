const axios = require('axios');
const crypto = require('crypto');
const accessKey = "193F293C37385A299D14";
const secretKey = "c2de29f1c86a6afc75d99caa8d78c0f228bc930ca71b102cb2bf158f51cc99802e9825fd85fdba0f";
const log = false;
async function makeRequest(method, urlPath, url, body = null) {

    try {
        httpMethod = method;
        httpBaseURL = "sandboxapi.rapyd.net";
        httpURLPath = urlPath;
        salt = generateRandomString(8);
        idempotency = new Date().getTime().toString();
        timestamp = Math.round(new Date().getTime() / 1000);
        signature = sign(httpMethod, httpURLPath, salt, timestamp, body)

        const options = {
            hostname: httpBaseURL,
            port: 443,
            path: httpURLPath,
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json',
                salt: salt,
                timestamp: timestamp,
                signature: signature,
                access_key: accessKey,
                idempotency: idempotency
            }
        }
        

        return await httpRequest(options, body, url, log);
    }
    catch (error) {
        console.error("Error generating request options");
        throw error;
    }
}

function generateRandomString(size) {
    try {
        return crypto.randomBytes(size).toString('hex');
    }
    catch (error) {
        console.error("Error generating salt");
        throw error;
    }
}

function sign(method, urlPath, salt, timestamp, body) {

    try {
        let bodyString = "";
        if (body) {
            bodyString = JSON.stringify(body);
            bodyString = bodyString == "{}" ? "" : bodyString;
        }

        let toSign = method.toLowerCase() + urlPath + salt + timestamp + accessKey + secretKey + bodyString;
        log && console.log(`toSign: ${toSign}`);

        let hash = crypto.createHmac('sha256', secretKey);
        hash.update(toSign);
        const signature = Buffer.from(hash.digest("hex")).toString("base64")
        log && console.log(`signature: ${signature}`);

        return signature;
    }
    catch (error) {
        console.error("Error generating signature");
        throw error;
    }
}


async function httpRequest(options, body, URL) {
    try {
        const AXIOS_RESPONSE = await axios.post(URL, body, options)
        console.log(AXIOS_RESPONSE.data);
        return AXIOS_RESPONSE.data;
    }
    catch (error) {
        console.error("Error generating request options");
        throw error;
    } 
}

exports.makeRequest = makeRequest;