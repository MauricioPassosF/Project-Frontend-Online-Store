import React, { Component } from 'react';
import CardProducts from '../components/CardProducts';
import FormsCheckout from '../components/FormsCheckout';

class Checkout extends Component {
  render() {
    const arrayProducts = JSON.parse(localStorage.getItem('productsList'));
    return (
      <div>
        Produtos:
        {
          arrayProducts.map((product) => (
            <CardProducts
              product={ product }
              key={ product.id }
            />
          ))
        }
        <FormsCheckout { ...this.props } />
      </div>
    );
  }
}

export default Checkout;
