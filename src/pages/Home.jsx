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

  addProduct = (product) => {
    const filteredProduct = {
      ...product,
      quantity: 1,
    };
    // Se existe productsList no localStorage
    if (localStorage.productsList) {
      const productsLocalStorage = JSON.parse(localStorage.productsList);
      //  Verifica se o produto já existe na lista
      if (productsLocalStorage.some((item) => item.id.includes(product.id))) {
        const arrayForChangeQuantity = productsLocalStorage.map((item) => {
          // Identifiquei o produto repitido e atualizei sua quantidade
          if (item.id.includes(product.id)) {
            item.quantity += 1;
          }
          return item;
        });
        localStorage.setItem('productsList', JSON.stringify(arrayForChangeQuantity));
      } else {
        // Quando é adicionado pela primeira vez na lista
        const takelocal = JSON.parse(localStorage.getItem('productsList'));
        const otherProductsList = [...takelocal, filteredProduct];
        localStorage.setItem('productsList', JSON.stringify(otherProductsList));
      }
    } else {
      // Quando o localStorage ainda não existe
      localStorage.setItem('productsList', JSON.stringify([filteredProduct]));
    }
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
            <CardProducts
              product={ product }
              key={ product.id }
              addProduct={ () => this.addProduct(product) }
            />
          ))}
        {
          productCategoryList.map((product) => (
            <CardProducts
              product={ product }
              key={ product.id }
              addProduct={ () => this.addProduct(product) }
            />
          ))
        }
      </div>
    );
  }
}

export default Home;
