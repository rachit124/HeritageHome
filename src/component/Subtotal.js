import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider'
import { getBasketTotal } from '../Reducer'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Subtotal() {
    
    const history = useHistory();
    const [{basket} ,dispatch] = useStateValue();
    const totalItemsInBasket = basket.reduce((total, item) => total + (item.quantity || 1), 0); // Calculate total items

  return (
    <div className='subtotal'>
        <CurrencyFormat 
        renderText={(value) => (
            <>
                <p>
                    Subtotal ({totalItemsInBasket} items): <strong>
                        {value}</strong>
                </p>
                <small className='subtotal_gift'>
                    <input type="checkbox" /> This order contains gift
                </small>
            </>
        )} 
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"} />

        {/* if we add link here it will change its styling */}
        <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal