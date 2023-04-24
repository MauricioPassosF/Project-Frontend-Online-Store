import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartShop from './pages/CartShop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/CartShop" component={ CartShop } />
        <Route
          exact
          path="/product/:id"
          render={ (props) => (
            <ProductDetails { ...props } />
          ) }
        />
        <Route
          exact
          path="/Checkout"
          render={ (props) => (
            <Checkout { ...props } />
          ) }
        />
      </Switch>
    </div>
  );
}

export default App;
