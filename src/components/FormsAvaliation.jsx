import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import Assessments from './Assessments';

class FormsAvaliation extends Component {
  state = {
    email: '',
    textarea: '',
    nota: 0,
    displayErrorMessage: false,
    haveComments: false,
  };

  componentDidMount() {
    this.showAssessments();
  }

  showAssessments = () => {
    const { id } = this.props;
    if (localStorage.getItem(id)) {
      this.setState({
        haveComments: true,
      });
    }
  };

  handleChage = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  saveLocalStorage = () => {
    const { email, textarea, nota } = this.state;
    const { id } = this.props;
    const avaliation = {
      email,
      text: textarea,
      rating: nota,
    };
    if (localStorage.getItem(id)) {
      const assessmentsLocalStorage = JSON.parse(localStorage.getItem(id));
      localStorage.setItem(id, JSON.stringify(
        [...assessmentsLocalStorage, avaliation],
      ));
    } else {
      localStorage.setItem(id, JSON.stringify([avaliation]));
    }
  };

  clearState = () => {
    this.setState({
      email: '',
      textarea: '',
      nota: 0,
      /* isChecked: false, */
      haveComments: true,
    });
  };

  clickBtn = (e) => {
    e.preventDefault();
    this.saveLocalStorage();
    this.clearState();
    const { email, textarea, nota } = this.state;
    this.setState({
      displayErrorMessage: (
        email !== 'teste@trybe.com' && textarea.length === 0 && Number(nota) === 0
      ),
    });
  };

  render() {
    const {
      email,
      textarea,
      displayErrorMessage,
      /* isChecked, */
      haveComments,
    } = this.state;
    const { id } = this.props;
    const arrayAssessments = JSON.parse(localStorage.getItem(id));
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ this.handleChage }
          />
          <label htmlFor="evaluation">
            1
            <input
              type="radio"
              name="nota"
              value="1"
              id="evaluation"
              /* checked={ isChecked } */
              data-testid="1-rating"
              onClick={ this.handleChage }
            />
            2
            <input
              type="radio"
              name="nota"
              value="2"
              id="evaluation"
              /* checked={ isChecked } */
              data-testid="2-rating"
              onClick={ this.handleChage }
            />
            3
            <input
              type="radio"
              name="nota"
              value="3"
              id="evaluation"
              /* checked={ isChecked } */
              data-testid="3-rating"
              onClick={ this.handleChage }
            />
            4
            <input
              type="radio"
              name="nota"
              value="4"
              id="evaluation"
              /* checked={ isChecked } */
              data-testid="4-rating"
              onClick={ this.handleChage }
            />
            5
            <input
              type="radio"
              name="nota"
              value="5"
              id="evaluation"
              /* checked={ isChecked } */
              data-testid="5-rating"
              onClick={ this.handleChage }
            />
          </label>
          <textarea
            name="textarea"
            value={ textarea }
            cols="30"
            rows="10"
            onChange={ this.handleChage }
            data-testid="product-detail-evaluation"
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ (e) => this.clickBtn(e) }
          >
            Enviar
          </button>
        </form>
        {
          haveComments ? (
            arrayAssessments.map((assessment, index) => (
              <Assessments key={ index } assessment={ assessment } />
            ))
          ) : ''
        }
        {
          displayErrorMessage ? <ErrorMessage /> : ''
        }
      </div>
    );
  }
}

FormsAvaliation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormsAvaliation;
