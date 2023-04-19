import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CartShop from './pages/CartShop';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/CartShop" component={ CartShop } />
      </Switch>
    </div>
  );
}

export default App;
