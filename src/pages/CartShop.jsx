import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardProducts from '../components/CardProducts';

export default class CartShop extends Component {
  state = {
    cart: [],
    haveThings: false,
  };

  componentDidMount() {
    this.takeProductLocalStorage();
  }

  takeProductLocalStorage = () => {
    const productsList = JSON.parse(localStorage.getItem('productsList'));
    this.setState({
      cart: productsList,
    }, () => {
      const { cart } = this.state;
      if (cart !== null) {
        this.setState({
          haveThings: true,
        });
      }
    });
  };

  render() {
    const { cart, haveThings } = this.state;
    return (
      <div>
        <Link to="/">Voltar</Link>
        {
          haveThings ? (
            cart.map((product) => (
              <CardProducts
                product={ product }
                key={ product.id }
                quantity={ product.quantity }
                type="cart"
              />
            ))
          ) : (
            <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
          )
        }

      </div>
    );
  }
}
