import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProducts extends Component {
  render() {
    const { product: { id, title, thumbnail, price } } = this.props;
    return (

      <div key={ id } data-testid="product">
        <h2>{ title }</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price}`}</p>
      </div>

    );
  }
}

CardProducts.propTypes = ({
  id: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,

}).isRequired;

export default CardProducts;
