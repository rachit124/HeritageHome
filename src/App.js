import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./component/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./component/StateProvider";
import Payment from "./component/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import Order from "./component/Order";

const promise = loadStripe("pk_test_51Q4kdUFosiKF0O4D1VvPKgf9AjV9SQ8WduUlfVJYLbJFl37K2XXGv5Rfgpr4PEEpni1SH7VhE0H1KyrS7Hbnoypx00i1soXpzz")


function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //will only run once when app componenets load...
    onAuthStateChanged(auth, authUser => {
      console.log('THE USER IS >>>', authUser);
      if(authUser){
        //use just logged in/ was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    //BEM
    <Router>
    <div className="App">
      
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        
        <Route exact path="/payment">
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>
        <Route exact path="/checkout">
          <Header/>
          <Checkout/>
        </Route>
        <Route exact path="/">
         <Header/>
          <Home/>
        </Route>
        <Route exact path="/order">
          <Header/>
          <Order />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
