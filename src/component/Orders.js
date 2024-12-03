import React from 'react'
import './Orders.css'
import moment from "moment"
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'

function Orders({orders}) {
  return (
    <div className='order'>
        <h2>Orders</h2>
        <p>{moment.unix(orders.data.created).format("MMMM Do YYYY, h:mma")}</p>
        <p className="order_id"><small>{orders.id}</small></p>
        {orders.data.basket?.map(item => (
            <CheckoutProduct 
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
                quantity={item.quantity}
            />
            
        ))}
        <CurrencyFormat 
            renderText={(value) =>(
                <h3 className='order_total'> Order Total: {value} </h3>
            )}
            decimalScale={2}
            value={orders.data.amount / 100}
            displayType={'text'}
            thousandSeparator={true}
            prefix='₹'

        />
    </div>
  )
}

export default Orders

