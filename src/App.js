import React from 'react';
import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import Checkout from './Checkout.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    // BEM convention - changing classname from App to app
    // Wrap the app in the Router
    <Router>
      <div className="app">
        {/* As the header will always be rendered regardless of the route, we put it outside of the switch statement */}
        <Header />
        {/* Adding the switch will allow us to create routes */}
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          {/* Route path will then render the selected components when we are on the home page - default page (/) */}
          {/* The Default route will always need to be at the bottom of the routes created */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
