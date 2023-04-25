import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

ProductQuantity.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default ProductQuantity;
