import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Link
          to="/CartShop"
          data-testid="shopping-cart-button"
        >
          <button
            type="button"
            name="btn-ShopCart"
          >
            🛒
          </button>
        </Link>
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      </div>
    );
  }
}

export default Home;
