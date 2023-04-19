import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    </div>
  );
}

export default App;
