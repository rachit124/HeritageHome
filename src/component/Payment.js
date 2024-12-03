import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import Checkout from '../Checkout';
import { Link,useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../Reducer';
import axios from './axios';
import { db } from '../firebase';
import { signInAnonymously } from 'firebase/auth';
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {
    const [{ basket,user } ,dispatch] = useStateValue();

    const stripe = useStripe();
    const Elements = useElements();

    const history = useHistory();

    const [succeeded,setSucceeded] = useState(false);
    const [processing,setProcessing] = useState("");

    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);

    const [clientSecret,setClientSecret] = useState("");

    useEffect(() =>{
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async() => {
            const response = await axios({
                method: 'post',

                //stripe expects the total in a currency subunits
                url: `/payments/create?total=${getBasketTotal(basket)*100}`,
            });
            console.log('Response:', response.data);
            setClientSecret(response.data.clientSecret);
        };

        getClientSecret();
    },[basket])

    console.log('the secret is ', clientSecret)
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: Elements.getElement(CardElement),
            },
        });

        // Handle payment confirmation
        if (payload.error) {
            // Show error to your customer
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            // Payment succeeded
            const paymentIntent = payload.paymentIntent;

            try {
                await setDoc(doc(collection(db, 'users'), user?.uid, 'orders', paymentIntent.id), {
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                });

                setSucceeded(true);
                setError(null);
                setProcessing(false);

                // Clear the basket after successful payment
                dispatch({
                    type: 'EMPTY_BASKET',
                });

                // Redirect to orders page
                history.replace('/order');
            } catch (error) {
                console.error("Error adding document: ", error);
                setError("There was an error processing your order. Please try again.");
                setProcessing(false);
            }
        }
    };

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }

  return (
    <div className='payment'>
        <div className="payment_container">
            <h1>
                Checkout (<Link style={{textDecoration: 'none',color: 'black'}} to="/checkout">{basket?.length} items</Link>)
            </h1>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{user?user?.email:"Guest"}<br/>Puri Pratham, Faridabad<br/>Haryana,121002</p>

                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review item and delivery</h3>
                </div>
                <div className="payment_item">
                    {basket.map(item => (
                        <CheckoutProduct 
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}
                        />
                    ))}
                </div>
            </div>
            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        
                        <div className="payment_priceContainer">
                        <CurrencyFormat 
                            renderText={(value) => (
                                <>
                                    <h3>Order Total: {value}</h3>
                                </>
                            )} 
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₹"} />

                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                    {processing ? <p>Processing</p> : "Buy Now"}
                                </span>
                            </button>
                        </div>

                        {/* Error */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment