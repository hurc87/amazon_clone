import React, { useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout.js';
import Login from './Login.js';
import Payment from './Payment.js';
import Orders from './Orders.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loudStripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// public key so is fine to go here!
const promise = loadStripe(
  'pk_test_51HXQTxBrKH0r3D9w255a7Ls9BUIACG6qKWGqWpqFDcQG4iUShaIECzEc2oiNxhLvD1PR55od6xnaauyf9gIyoWuX00d2WPPNsJ'
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads
    // if we put [user, basket] it will run the code any time the basket or user changes, but but keeping it empty it will only run the once
    // auth.onAuthStateChanged is a listener which is constantly listen out for auth changes
    auth.onAuthStateChanged((authUser) => {
      console.log('User >>>', authUser);

      if (authUser) {
        // user just logged in or was already logged in
        dispatch({
          // send user to the data layer
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM convention - changing classname from App to app
    // Wrap the app in the Router
    <Router>
      <div className="app">
        {/* As the header will always be rendered regardless of the route, we put it outside of the switch statement */}
        {/* <Header /> */}
        {/* Because we do not want the header on the login page, this is now being moved */}
        {/* Adding the switch will allow us to create routes */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            {/* Wrapping the payment component in a higher order function */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          {/* Route path will then render the selected components when we are on the home page - default page (/) */}
          {/* The Default route will always need to be at the bottom of the routes created */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
