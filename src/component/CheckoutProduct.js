import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating,hideButton,quantity = 1}) {

    const [{basket}, dispatch] = useStateValue();

    const increaseQuantity = () => {
        dispatch({
            type: 'CHANGE_QUANTITY',
            id: id,
            quantity: quantity + 1
        });
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            dispatch({
                type: 'CHANGE_QUANTITY',
                id: id,
                quantity: quantity - 1
            });
        }
    };


    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
            
        })
    }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct_image' src={image} alt="" />
        <div className="checkoutProduct_info">
            <p className="checkoutProduct_title">
                {title}
            </p>
            <p className='checkoutProduct_price'><small>₹</small><strong>{price}</strong></p>
            <div className='checkoutProduct_rating'>
                {Array(rating).fill().map((_,i) => (
                    <p key={i}>🌟</p>
                ))}
            </div>
            
            <p className="checkoutProduct_quantity">Quantity: {quantity}</p>
            {!hideButton && (
            <button onClick={decreaseQuantity}>-</button>
            )}
            {!hideButton && (
            <button onClick={increaseQuantity}>+</button>
            )}
            <br></br>
            {!hideButton && (
                <button onClick={removeFromBasket}>Remove from Basket</button>
            )}
            
            
        </div>
    </div>
    
  )
}

export default CheckoutProduct