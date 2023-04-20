import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartShop from './pages/CartShop';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/CartShop" component={ CartShop } />
        <Route exact path="/product/:id" component={ ProductDetails } />
      </Switch>
    </div>
  );
}

export default App;
