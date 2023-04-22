import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Assessments extends Component {
  render() {
    const { assessment } = this.props;
    return (
      <div>
        <h2 data-testid="review-card-email">{assessment.email}</h2>
        <p data-testid="review-card-rating">{ '⭐'.repeat(assessment.rating)}</p>
        <p data-testid="review-card-evaluation">{assessment.text}</p>
      </div>
    );
  }
}
Assessments.propTypes = ({
  email: PropTypes.string,
  nota: PropTypes.string,
  comentario: PropTypes.string,
}).isRequired;
export default Assessments;
