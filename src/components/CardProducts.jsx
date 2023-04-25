import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../Css/CardProducts.css';

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
    const { product } = this.props;
    const arrayProducts = JSON.parse(localStorage.getItem('productsList'));
    const produto = arrayProducts.filter((prod) => prod.id === product.id)[0];
    if (type === 'add' && produto.quantity < product.available_quantity) {
      produto.quantity += 1;
    } else if (type !== 'add') {
      produto.quantity -= 1;
    }
    const indexProduct = arrayProducts.findIndex((prod) => prod.id === product.id);
    arrayProducts.splice(indexProduct, 1, produto);
    localStorage.setItem('productsList', JSON.stringify(arrayProducts));
    this.updateQuantity();
  };

  render() {
    const {
      product: { id, title, thumbnail, price }, addProduct, type, removeProduct,
    } = this.props;
    const { quantityState } = this.state;
    return (
      <div key={ id } data-testid="product" className="card-product">
        <img
          src={ thumbnail }
          alt={ title }
          className="img-card-product"
        />
        <Link
          className="link-h2"
          exact
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <h2
            className="title"
            data-testid={
              type === 'cart' ? ('shopping-cart-product-name') : ''
            }
          >
            { title }
          </h2>
        </Link>
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
          /* type="button" */
          className="button"
          type="submit"
          data-testid="product-add-to-cart"
          onClick={ () => addProduct() }
        >
          <span className="button__text">Adicionar ao carrinho</span>
          <span className="button__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
              <line y2="19" y1="5" x2="12" x1="12" />
              <line y2="12" y1="12" x2="19" x1="5" />
            </svg>
          </span>
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
