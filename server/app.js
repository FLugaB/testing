require('dotenv').config()
const express = require("express");
const cors = require('cors')
const app = express();
const port =  8000;

const axios = require('axios')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SANDBOX_BASE_URL = "https://app.sandbox.midtrans.com"

const requestSnapToken = async (req, res, next) => {

    try {
        
        const AUTH_STRING = Buffer.from(`${process.env.MID_SERVER_KEY}:`).toString('base64')

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization : `Basic ${AUTH_STRING}`,
        }
        
        const parameter = {
            "transaction_details": {
              "order_id": "FF-01",
              "gross_amount": 20000
            }
          }

        const response = await axios.post( 
            `${SANDBOX_BASE_URL}/snap/v1/transactions`, 
            parameter, 
            {
                headers: headers
            }
        )

        const token = response.data
        
        res.status(200).json({
            token
        })
        
    } catch (error) {
        console.log(error)
    }
}

app.post('/midtrans/checkout', requestSnapToken );

app.listen(port, () => {
    console.log(`server http://localhost:${port}`);
});