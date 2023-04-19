import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Categories from '../components/Categories';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categoryList: [],
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

  render() {
    const { categoryList, loading } = this.state;
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
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
