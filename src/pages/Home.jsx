import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Categories from '../components/Categories';
import {
  getCategories,
  getSpecificCategory,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import CardProducts from '../components/CardProducts';
import addProduct from '../services/addProduct';
import ProductQuantity from '../components/ProductQuantity';
import Header from '../components/Header';

class Home extends Component {
  state = {
    nameInput: '',
    productsList: [],
    needTheText: false,
    categoryList: [],
    productCategoryList: [],
    loading: false,
    totalAmount: 0,
  };

  componentDidMount() {
    this.fetchCategoryList();
    this.test();
  }

  test = () => {
    const quantity = JSON.parse(localStorage.getItem('totalAmount')) || [];
    this.setState({
      totalAmount: quantity,
    });
  };

  fetchCategoryList = async () => {
    this.setState({ loading: true });
    const categories = await getCategories();
    this.setState({ categoryList: categories, loading: false });
  };

  clickCategories = async ({ target: { value } }) => {
    const { categoryList } = this.state;
    const productId = categoryList.filter((category) => category.name === value)[0].id;
    const response = await getSpecificCategory(productId);
    this.setState({
      productsList: [],
      productCategoryList: response.results,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  fetchApi = async (e) => {
    const { nameInput } = this.state;
    e.preventDefault();
    const result = await getProductsFromCategoryAndQuery('', nameInput);
    this.setState({
      nameInput: '',
      productCategoryList: [],
      productsList: result.results,
      needTheText: true,
    });
  };

  render() {
    const {
      nameInput,
      productsList,
      needTheText,
      categoryList,
      loading,
      productCategoryList,
      totalAmount,
    } = this.state;
    return (
      <div>
        <Header
          handleChange={ this.handleChange }
          nameInput={ nameInput }
          fetchApi={ this.fetchApi }
        />
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
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="category">
            { categoryList.map(({ id, name }) => (
              <Categories
                key={ id }
                name={ name }
                value={ name }
                clickCategories={ this.clickCategories }
              />
            ))}
          </div>
        )}
        { needTheText && productsList.length === 0 ? (
          <h2>Nenhum produto foi encontrado</h2>
        )
          : productsList.map((product) => (
            <>
              {product.shipping.free_shipping
                ? <p data-testid="free-shipping">:caminhão: Frete grátis</p>
                : ''}
              <CardProducts
                product={ product }
                key={ product.id }
                addProduct={ () => addProduct(product) }
                type="product"
                test={ this.test }
              />
            </>
          ))}
        {
          productCategoryList.map((product) => (
            <>
              {product.shipping.free_shipping
                ? <p data-testid="free-shipping">:caminhão: Frete grátis</p>
                : ''}
              <CardProducts
                product={ product }
                key={ product.id }
                addProduct={ () => addProduct(product) }
                type="product"
                test={ this.test }
              />
            </>
          ))
        }
      </div>
    );
  }
}

export default Home;
