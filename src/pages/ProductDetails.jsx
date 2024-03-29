import { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { getProductById } from '../services/api';
import addProduct from '../services/addProduct';
import FormsAvaliation from '../components/FormsAvaliation';
import ProductQuantity from '../components/ProductQuantity';

export default class ProductDetails extends Component {
  state = {
    productData: {},
    totalAmount: 0,
  };

  componentDidMount() {
    this.fetchProduct();
    this.updateQuantityState();
  }

  updateQuantityState = () => {
    const quantity = JSON.parse(localStorage.getItem('totalAmount')) || 0;
    this.setState({
      totalAmount: quantity,
    });
  };

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const productData = await getProductById(id);
    this.setState({ productData });
  };

  render() {
    const {
      productData: { title, price, thumbnail }, productData, totalAmount } = this.state;
    const { match: { params: { id } } } = this.props;

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
          <button
            type="button"
            name="btn-ShopCart"
            onClick={ () => {
              addProduct(productData);
              this.updateQuantityState();
            } }
            data-testid="product-detail-add-to-cart"
          >
            Comprar
          </button>
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
          <ProductQuantity totalAmount={ totalAmount } />
          <FormsAvaliation id={ id } />
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
