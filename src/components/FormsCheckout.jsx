import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

class FormsCheckout extends Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    showErrorMessage: false,
  };

  handleChanges = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  clickBtn = (e) => {
    e.preventDefault();
    const {
      name, email, cpf, phone, cep, address, payment } = this.state;
    this.setState({
      showErrorMessage: (
        name.length === 0
        || email.length === 0
        || cpf.length === 0
        || phone.length === 0
        || cep.length === 0
        || address.length === 0
        || payment.length === 0
      ),
    }, () => {
      const { showErrorMessage } = this.state;
      const { history } = this.props;
      localStorage.removeItem('productsList');
      if (!showErrorMessage) {
        history.push('/');
      }
    });
  };

  render() {
    const {
      name, email, cpf, phone, cep, address, showErrorMessage,
    } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="checkout-fullname"
            onChange={ this.handleChanges }
          />
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="checkout-email"
            onChange={ this.handleChanges }
          />
          <input
            type="text"
            name="cpf"
            value={ cpf }
            data-testid="checkout-cpf"
            onChange={ this.handleChanges }
          />
          <input
            type="tel"
            name="phone"
            value={ phone }
            data-testid="checkout-phone"
            onChange={ this.handleChanges }
          />
          <input
            type="text"
            name="cep"
            value={ cep }
            data-testid="checkout-cep"
            onChange={ this.handleChanges }
          />
          <input
            type="text"
            name="address"
            value={ address }
            data-testid="checkout-address"
            onChange={ this.handleChanges }
          />
          <label>
            Forma de pagamento:
            <label>
              <input
                type="radio"
                name="payment"
                value="Boleto"
                data-testid="ticket-payment"
                onChange={ this.handleChanges }
              />
              Boleto
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Visa"
                data-testid="visa-payment"
                onChange={ this.handleChanges }
              />
              Visa
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="MasterCard"
                data-testid="master-payment"
                onChange={ this.handleChanges }
              />
              MasterCard
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Elo"
                data-testid="elo-payment"
                onChange={ this.handleChanges }
              />
              Elo
            </label>
          </label>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.clickBtn }
          >
            Enviar
          </button>
        </form>
        {
          showErrorMessage ? (
            <ErrorMessage />
          ) : ''
        }
      </div>
    );
  }
}

FormsCheckout.propTypes = {
  history: PropTypes.func.isRequired,
};

export default FormsCheckout;
