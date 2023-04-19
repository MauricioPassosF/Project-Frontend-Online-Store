import { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    productData: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { params: { id } } = match;
    const productData = await getProductById(id);
    this.setState({ productData });
  };

  render() {
    const { productData: { title, price, thumbnail } } = this.state;

    return (
      <main>
        <Link to="/">Voltar</Link>
        <div>
          <h3 data-testid="product-detail-name">
            {title}
          </h3>
          <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        </div>
        <div>
          <h3>Especificações técnicas</h3>
          <ul>
            <li>Lorem ipsum dolor sit</li>
            <li>Veniam, expedita reprehenderit error </li>
            <li>At iste tempora pariatur!</li>
            <li>Sequi dolores quas</li>
            <li>Illo suscipit voluptas veritatis ipsa possimus iste assumenda</li>
          </ul>
          <span data-testid="product-detail-price">{`R$ ${price}`}</span>
          <Link
            to="/CartShop"
            data-testid="shopping-cart-button"
          >
            <button
              type="button"
              name="btn-ShopCart"
            >
              🛒
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
