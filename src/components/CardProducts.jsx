import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProducts extends Component {
  render() {
    const { product: { id, title, thumbnail, price } } = this.props;
    return (
      <div key={ id } data-testid="product">
        <Link
          exact
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <h2>{ title }</h2>
        </Link>
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
