import React from 'react';
import './SavedLoans.css';

const SavedLoans = ({ loans }) => {
  return (
    <section className="saved-loans">
      <h2>Saved Loans</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id || loan._id} className="loan-card">
            <p>Amount: ${loan.amount}</p>
            <p>Interest Rate: {loan.interestRate}%</p>
            <p>Term: {loan.term} years</p>
            <p>Extra Payment: ${loan.extraPayment}</p>
            <p>Monthly Payment: ${loan.result?.monthlyPayment.toFixed(2)}</p>
            <p>Total Interest: ${loan.result?.totalInterest.toFixed(2)}</p>
            <p>Payoff Time: {loan.result?.payoffMonths} months</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SavedLoans;