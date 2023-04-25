import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProducts extends Component {
  state = {
    quantityState: 1,
  };

  componentDidMount() {
    this.updateQuantity();
  }

  updateQuantity = () => {
    const quantityProduct = JSON.parse(localStorage.getItem('productsList')) || [];
    if (quantityProduct && quantityProduct.length > 0) {
      const { quantityState } = this.state;
      const { product: { id } } = this.props;
      const product = quantityProduct.find((item) => (item.id === id));
      this.setState({
        quantityState: product ? product.quantity : quantityState,
      });
    }
  };

  addAndSubtractQuantity = (type) => {
    const { product: { id } } = this.props;
    const arrayProducts = JSON.parse(localStorage.getItem('productsList'));
    const produto = arrayProducts.filter((product) => product.id === id)[0];
    if (type === 'add') {
      produto.quantity += 1;
    } else {
      produto.quantity -= 1;
    }
    const indexProduct = arrayProducts.findIndex((product) => product.id === id);
    arrayProducts.splice(indexProduct, 1, produto);
    localStorage.setItem('productsList', JSON.stringify(arrayProducts));
    this.updateQuantity();
  };

  render() {
    const {
      product: { id, title, thumbnail, price }, addProduct, type, removeProduct, test,
    } = this.props;
    const { quantityState } = this.state;
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
            <div>
              <p data-testid="shopping-cart-product-quantity">
                {
                  `Quantidade: ${quantityState <= 0 ? 1 : quantityState}`
                }
              </p>
              <button
                type="submit"
                data-testid="product-increase-quantity"
                onClick={ () => this.addAndSubtractQuantity('add') }
              >
                +
              </button>
              <button
                data-testid="remove-product"
                type="submit"
                onClick={ () => removeProduct(id) }
              >
                REMOVER
              </button>
              <button
                type="submit"
                data-testid="product-decrease-quantity"
                onClick={ () => this.addAndSubtractQuantity() }
              >
                -
              </button>
            </div>
          ) : ''
        }
        <p>{`R$ ${price}`}</p>
        <button
          type="submit"
          data-testid="product-add-to-cart"
          onClick={ () => {
            addProduct();
            test();
          } }
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
