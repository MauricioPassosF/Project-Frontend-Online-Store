import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProducts extends Component {
  render() {
    const {
      product: { id, title, thumbnail, price, quantity }, addProduct, type } = this.props;
    return (
      <div key={ id } data-testid="product">
        <Link
          exact
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <h2
            data-testid={
              type === 'cart' ? ('shopping-cart-product-name') : ''
            }
          >
            { title }

          </h2>
        </Link>
        <img src={ thumbnail } alt={ title } />
        {
          type === 'cart' ? (
            <p data-testid="shopping-cart-product-quantity">
              {
                `Quantidade: ${quantity}`
              }
            </p>
          ) : ''
        }
        <p>{`R$ ${price}`}</p>
        <button
          type="submit"
          data-testid="product-add-to-cart"
          onClick={ addProduct }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

CardProducts.propTypes = ({
  id: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  addProduct: PropTypes.func,
  type: PropTypes.string,

}).isRequired;

export default CardProducts;
