import React from 'react'
import './Checkout.css'
import Subtotal from './component/Subtotal'
import { useStateValue } from './component/StateProvider';
import CheckoutProduct from './component/CheckoutProduct';

function Checkout() {
    const [{basket,user}, dispatch] = useStateValue();
  return (
    <div className='checkout'>
        <div className="checkout_left">
            <img className="checkout_ad" src="https://tse1.mm.bing.net/th?id=OIP.WWc3L7_7Vi7IuSpzVbxhUAHaBY&pid=Api&P=0&h=180" alt="" />
            <div>
                <h3>Hello, {user ? user?.email : 'Guest'}</h3>
                <h2 className="checkout_title">
                    Your Shopping Basket
                </h2>
                {basket.map(item =>(
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        quantity={item.quantity}
                    />
                ))}

            </div>
        </div>
        <div className="checkout_right">
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout