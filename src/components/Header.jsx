import React, { Component } from 'react';
import CardProducts from './CardProducts';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Header extends Component {
  state = {
    name: '',
    productsList: [],
    needTheText: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  fetchApi = async (e) => {
    const { name } = this.state;
    e.preventDefault();
    const result = await getProductsFromCategoryAndQuery('', name);
    this.setState({
      name: '',
      productsList: result.results,
      needTheText: true,
    });
  };

  render() {
    const { name, productsList, needTheText } = this.state;
    return (
      <div>
        <input
          type="text"
          name="name"
          value={ name }
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
      </div>
    );
  }
}

export default Header;
