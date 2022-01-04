const makeRequest = require('./makeRequest').makeRequest
const express=require('express');
const {pool} =require('./config')
const app=express()
const {v4: uuidv4}=require('uuid')
const port=process.env.PORT||5000
const cors=require('cors')
const url = 'https://sandboxapi.rapyd.net/v1/user'
const curl="https://sandboxapi.rapyd.net/v1/customers"


// Middleware section
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))








// Post requests





/* 
* POST request to create a personal customer account
*/
app.post('/v1/user/create/customer/personal',async(req,res)=>{
    const {firstname,lastname,username,type}=req.body
    console.log("received data",req.body)
    
    
    try {
        console.log("wallet data stage")
        let wallet = {
    "first_name": firstname,
    "last_name": lastname,
    "email": "",
    "ewallet_reference_id": uuidv4(),
    "metadata": {
        "merchant_defined": true
    },
    "phone_number": "",
    "type": "person",
    "contact": {
        "phone_number": "+14155551311",
        "email": "johndoe@rapyd.net",
        "first_name": "John",
        "last_name": "Doe",
        "mothers_name": "Jane Smith",
        "contact_type": "personal",
        "address": {
            "name": firstname+lastname,
            "line_1": "123 Main Street",
            "line_2": "",
            "line_3": "",
            "city": "Anytown",
            "state": "NY",
            "country": "US",
            "zip": "12345",
            "phone_number": "+14155551111",
            "metadata": {},
            "canton": "",
            "district": ""
        },
        "identification_type": "PA",
        "identification_number": "1234567890",
        "date_of_birth": "11/22/2000",
        "country": "US",
        "nationality": "FR",
        "metadata": {
            "merchant_defined": true
        }
    }
}
        console.log("trying wallet creation")
        const result = await makeRequest('POST', '/v1/user',url, wallet);
    
        console.log(result);
        console.log("wallet",result.status.status)
        console.log("wallet",result.data.id)
        if(result.status.status=="SUCCESS"){
          try {
              const cust = {
                business_vat_id: '123456789',
                email: 'johndoe@rapyd.net',
                ewallet:result.data.id,
                invoice_prefix: 'JD-',
                metadata: {
                  merchant_defined: true
                },
                name: firstname+lastname,
                phone_number: '+14155559993'
              };
              
              const cresult = await makeRequest('POST', '/v1/customers',curl, cust);
          
              console.log("customerid status",cresult.status.status);
              console.log("customerid ewallet",cresult.data.ewallet);
              console.log("customerid ewallet",cresult.data.id);
              pool.query(`
                        UPDATE people SET ewallet=$1,customerid=$2 WHERE username=$3
                    `,[cresult.data.ewallet,cresult.data.id,username],(err,results)=>{
                        if(err){
                            throw err
                        }else{
                            res.send({status:"SUCCESS"})
                        }
                    })
            //   res.send(cresult) 
            } catch (error) {
              console.error('Error completing request at wallet level', error);
              res.send({status:"FAILED"})
            }
        }
      } catch (error) {
        console.error('Error completing request at customer level', error);
        res.send({status:"FAILED"})
      }

   

})





/* 
* POST request to create a personal customer account
*/

app.post('/v1/user/create/customer/company',async(req,res)=>{
    const {firstname,lastname,username,type}=req.body
    console.log("received data",req.body)
    
    
    try {
        console.log("wallet data stage")
        let wallet = {
            first_name: 'admin',
            last_name: 'admin',
            ewallet_reference_id: uuidv4(),
            metadata: {
              merchant_defined: true
            },
            type: type,
            contact: {
              phone_number: '+14155551234',
              email: 'johndoe@rapyd.net',
              first_name: 'John',
              last_name: 'Doe',
              mothers_name: 'Jane Smith',
              contact_type: 'business',
              address: {
                name: 'John Doe',
                line_1: '123 Main Street',
                line_2: '',
                line_3: '',
                city: 'Anytown',
                state: 'NY',
                country: 'US',
                zip: '12345',
                phone_number: '+14155551234',
                metadata: { number: 2 },
                canton: '',
                district: ''
              },
              identification_type: 'PA',
              identification_number: '1234567890',
              date_of_birth: '11/22/2000',
              country: 'US',
              metadata: {
                merchant_defined: true
              },
              business_details: {
                entity_type: 'association',
                name: 'Four Star Professional Services',
                registration_number: '4234567779',
                industry_category: 'company',
                industry_sub_category: 'home services',
                address: {
                  name: 'John Doe',
                  line_1: '1234 Main Street',
                  line_2: 'Suite 1200',
                  line_3: '',
                  city: 'Anytown',
                  state: 'NY',
                  country: 'US',
                  zip: '10101',
                  phone_number: '14155557779',
                  metadata: {
                    merchant_defined: true
                  }
                }
              }
            }
          };
        console.log("trying wallet creation")
        const result = await makeRequest('POST', '/v1/user',url, wallet);
    
        console.log(result);
        console.log("wallet",result.status.status)
        console.log("wallet",result.data.id)
        if(result.status.status=="SUCCESS"){
          try {
              const cust = {
                business_vat_id: '123456789',
                email: 'johndoe@rapyd.net',
                ewallet:result.data.id,
                invoice_prefix: 'JD-',
                metadata: {
                  merchant_defined: true
                },
                name: firstname+lastname,
                phone_number: '+14155559993'
              };
              
              const cresult = await makeRequest('POST', '/v1/customers',curl, cust);
          
              console.log("customerid status",cresult.status.status);
              console.log("customerid ewallet",cresult.data.ewallet);
              console.log("customerid ewallet",cresult.data.id);
              pool.query(`
                        UPDATE people SET ewallet=$1,customerid=$2 WHERE username=$3
                    `,[cresult.data.ewallet,cresult.data.id,username],(err,results)=>{
                        if(err){
                            throw err
                        }else{
                            res.send({status:"SUCCESS"})
                        }
                    })
            //   res.send(cresult)
            } catch (error) {
              console.error('Error completing request at wallet level', error);
              res.send({status:"FAILED"})
            }
        }
      } catch (error) {
        console.error('Error completing request at customer level', error);
        res.send({status:"FAILED"})
      }

   

})





/* 
* POST request to add a user into the database
*/
app.post('/v1/user/register',(req,res)=>{
    const {firstname,lastname,referenceid,type,username,password}=req.body
    pool.query(`
        INSERT INTO people(firstname,lastname,referenceid,type,username,password) VALUES($1,$2,$3,$4,$5,$6)
    `,[firstname,lastname,referenceid,type,username,password],(error,results)=>{
        if(error){
            throw error;
        }
        res.send({status:"User Registered"})
    })
})


// GET Requests
app.get('/v1/user/view',(req,res)=>{
    pool.query(`
        SELECT * FROM people  
    `,(error,results)=>{
        if(error){
            throw error
        }
        res.send(results.rows)
    })
})






// Listen for app
app.listen(port,()=>{
    console.log(`server running on port: ${port}`)
})


