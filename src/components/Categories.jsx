import { Component } from 'react';
import PropTypes from 'prop-types';
import '../Css/Categories.css';

export default class Categories extends Component {
  render() {
    const { name, clickCategories } = this.props;
    return (
      <aside className="aside">
        <label
          htmlFor={ `category-${name}` }
          data-testid="category"
        >
          <input
            type="radio"
            value={ name }
            id={ `category-${name}` }
            name="category"
            onClick={ clickCategories }
          />
          { name }
        </label>
      </aside>
    );
  }
}

Categories.propTypes = ({
  name: PropTypes.string,
  clickCategories: PropTypes.func,
}).isRequired;
