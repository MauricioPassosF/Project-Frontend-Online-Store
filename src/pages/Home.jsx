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

class Home extends Component {
  state = {
    nameInput: '',
    productsList: [],
    needTheText: false,
    categoryList: [],
    productCategoryList: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchCategoryList();
  }

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
    } = this.state;
    return (
      <div>
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
        <input
          type="text"
          name="nameInput"
          value={ nameInput }
          data-testid="query-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.fetchApi }
        >
          🔎
        </button>
        { needTheText && productsList.length === 0 ? (
          <h2>Nenhum produto foi encontrado</h2>
        )
          : productsList.map((product) => (
            <CardProducts product={ product } key={ product.id } />
          ))}
        {
          productCategoryList.map((product) => (
            <CardProducts product={ product } key={ product.id } />
          ))
        }
      </div>
    );
  }
}

export default Home;
