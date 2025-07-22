import React, { useState, useEffect } from 'react';
import LoanForm from './components/LoanForm';
import LoanResults from './components/LoanResults';
import SavedLoans from './components/SavedLoans';
import { calculateLoan } from './utils/loanCalculator';
import axios from 'axios';
import './App.css';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://smart-mortgage-planner-backend-production-9506.up.railway.app//api' 
  : 'http://localhost:3000/api';

const App = () => {
  const [result, setResult] = useState(null);
  const [savedLoans, setSavedLoans] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    axios.get(`${API_URL}/loans`)
      .then((res) => setSavedLoans(res.data))
      .catch((err) => console.error('Error fetching loans:', err));

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleCalculate = (loanDetails) => {
    const calcResult = calculateLoan(
      loanDetails.amount,
      loanDetails.interestRate,
      loanDetails.term,
      loanDetails.extraPayment
    );
    setResult({ ...calcResult, loanDetails });
  };

  const handleSaveLoan = () => {
    if (result) {
      axios.post(`${API_URL}/loans`, { ...result.loanDetails, result })
        .then((res) => setSavedLoans([...savedLoans, res.data]))
        .catch((err) => console.error('Error saving loan:', err));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <header>
        <h1>Smart Mortgage Planner</h1>
        <button onClick={toggleTheme}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <LoanForm onCalculate={handleCalculate} />
      {result && (
        <>
          <LoanResults result={result} loanDetails={result.loanDetails} />
          <button className="save-loan-btn" onClick={handleSaveLoan}>
            Save Loan
          </button>
        </>
      )}
      <SavedLoans loans={savedLoans} />
    </div>
  );
};

export default App;
