/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');

const express = require("express");

const cors = require("cors");

const stripe = require("stripe")('sk_test_51Q4kdUFosiKF0O4D0a2SbrGnzg3IVuPn9ToH08I1HjSYQVUA5I9U2HN8rVUYmEIZMACnoFkJKqj40rFPOrVJDIPf00bwCw8VGV')

//API

//App config
const app = express();

//Middlewares
app.use(cors({origin: true}));
app.use(express.json());

//API routes
app.get('/',(request,response) => response.status(200).send('hello world'))

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recieved for amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr"
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
// http function initialized (http://127.0.0.1:5001/heritage-homes-2ff7f/us-central1/api).  