import React, { Component } from 'react';

class ProductQuantity extends Component {
  render() {
    const { totalAmount } = this.props;
    return (
      <div>
        <p data-testid="shopping-cart-size">{ totalAmount }</p>
      </div>
    );
  }
}

export default ProductQuantity;
