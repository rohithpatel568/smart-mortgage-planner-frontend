import React, { useState } from 'react';
import './LoanForm.css';

const LoanForm = ({ onCalculate }) => {
  const [loanDetails, setLoanDetails] = useState({
    amount: 200000,
    interestRate: 5,
    term: 30,
    extraPayment: 0,
  });

  const handleInputChange = (e) => {
    setLoanDetails({ ...loanDetails, [e.target.name]: parseFloat(e.target.value) || 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(loanDetails);
  };

  return (
    <section className="loan-form">
      <h2>Loan Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loan Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={loanDetails.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            name="interestRate"
            value={loanDetails.interestRate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Loan Term (Years)</label>
          <input
            type="number"
            name="term"
            value={loanDetails.term}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Extra Monthly Payment ($)</label>
          <input
            type="number"
            name="extraPayment"
            value={loanDetails.extraPayment}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
    </section>
  );
};

export default LoanForm;