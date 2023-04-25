import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CardProducts from '../components/CardProducts';
import '../Css/CartShop.css';

export default class CartShop extends Component {
  state = {
    cart: [],
    haveThings: false,
  };

  componentDidMount() {
    this.takeProductLocalStorage();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { cart } = this.state;
    if (prevState.cart !== cart) {
      this.test(cart);
    }
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

  removeProduct = (id) => {
    const arrayProducts = JSON.parse(localStorage.getItem('productsList')) || [];
    /* const indexProduct = arrayProducts.findIndex((product) => product.id === id); */
    const newArray = arrayProducts.filter((product) => product.id !== id);
    /* arrayProducts.splice(indexProduct, 1); */
    localStorage.setItem('productsList', JSON.stringify(newArray));
    if (newArray.length === 0) {
      this.setState({
        haveThings: false,
      });
    }
    this.setState({
      cart: newArray,
    });
  };

  test(cart) {
    if (cart === null) {
      this.setState({
        haveThings: false,
      });
    }
  }

  render() {
    const { cart, haveThings } = this.state;
    return (
      <div className="div-content">
        <Link to="/">Voltar</Link>
        {
          haveThings ? (
            <div>
              {
                cart.map((product) => (
                  <CardProducts
                    product={ product }
                    key={ product.id }
                    removeProduct={ this.removeProduct }
                    type="cart"
                  />
                ))
              }
              <Link exact to="/Checkout" data-testid="checkout-products">
                <button type="submit">Finalizar a Compra</button>
              </Link>
            </div>
          ) : (
            <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
          )
        }
      </div>
    );
  }
}
