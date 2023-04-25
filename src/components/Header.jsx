import React, { Component } from 'react';
import '../Css/Header.css';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {

  };

  render() {
    const { handleChange, nameInput, fetchApi } = this.props;
    return (
      <div className="div-content-header">
        <input
          type="text"
          name="nameInput"
          value={ nameInput }
          data-testid="query-input"
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="query-button"
          onClick={ fetchApi }
        >
          🔎
        </button>
        <h1>FRONTEND ONLINE STORE</h1>
        <img
          className="img-header"
          src="../ImagesCss/1f6d2.png"
          alt="Icone de carrinho png"
        />
      </div>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  nameInput: PropTypes.string.isRequired,
  fetchApi: PropTypes.func.isRequired,
};

export default Header;
