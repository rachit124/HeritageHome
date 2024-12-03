import React, { useEffect, useState } from 'react'
import './Order.css'
import { db } from '../firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import Orders from './Orders';

function Order() {
    const [{basket,user},dispatch] = useStateValue();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        if(user){
            
            const ordersRef = collection(db, 'users', user?.uid, 'orders');
            const q = query(ordersRef, orderBy('created', 'desc')); // Query orders by creation date

            // Listen for real-time updates
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })));
            });

            return () => unsubscribe();
        }else{
            setOrders([])
        }
    },[user])
  return (
    <div className='orders'>
        <h1>Your Order</h1>
        <div className="orders_order">
            {orders?.map(order =>(
                <Orders key={order.id} orders={order}/>
            ))}
        </div>
    </div>
  )
}

export default Order