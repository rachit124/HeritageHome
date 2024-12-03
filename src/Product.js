import React, { useState } from 'react'
import "./Product.css"
import { useStateValue } from './component/StateProvider'

function Product({id,title,image,price,rating}) {

    const [{basket},dispatch] = useStateValue();

    const addToBasket = () => {
        //dispatch item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
                uniqueId: Date.now(),
            },
        });
    }
  return (
    <div className='product'>
        <div className="product_info">
            <p>{title}</p>
            <p className='product_price'><small>₹</small><strong>{price}</strong></p>
            <div className="product_rating">
                {Array(rating).fill().map((_,i) => (
                    <p key={i}>🌟</p>
                ))}
                
            </div>
        </div>
        <img src={image} alt="" />
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product