import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { calculateWithoutExtra } from '../utils/loanCalculator';
import './LoanResults.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const LoanResults = ({ result, loanDetails }) => {
  const chartRef = useRef(null);
  const comparisonChartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      if (comparisonChartRef.current && comparisonChartRef.current.chartInstance) {
        comparisonChartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const data = {
    labels: result.schedule.map((entry) => entry.month),
    datasets: [
      {
        label: 'Balance',
        data: result.schedule.map((entry) => entry.balance.toFixed(2)),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        fill: false,
      },
      {
        label: 'Interest Paid',
        data: result.schedule.map((entry) => entry.interest.toFixed(2)),
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        fill: false,
      },
    ],
  };

  const noExtraResult = calculateWithoutExtra(loanDetails.amount, loanDetails.interestRate, loanDetails.term);
  const comparisonData = {
    labels: noExtraResult.schedule.map((entry) => entry.month),
    datasets: [
      {
        label: 'Balance (No Extra Payment)',
        data: noExtraResult.schedule.map((entry) => entry.balance.toFixed(2)),
        borderColor: '#6b7280',
        backgroundColor: '#6b7280',
        fill: false,
      },
      {
        label: 'Balance (With Extra Payment)',
        data: result.schedule.map((entry) => entry.balance.toFixed(2)),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <section className="loan-results">
      <h2>Results</h2>
      <div className="results-grid">
        <div className="result-card">
          <h3>Monthly Payment</h3>
          <p>${result.monthlyPayment.toFixed(2)}</p>
        </div>
        <div className="result-card">
          <h3>Total Interest Paid</h3>
          <p>${result.totalInterest.toFixed(2)}</p>
        </div>
        <div className="result-card">
          <h3>Payoff Time</h3>
          <p>{result.payoffMonths} months</p>
        </div>
      </div>
      <div className="chart-container">
        <h3>Amortization Schedule</h3>
        <div className="chart">
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </div>
      <div className="chart-container">
        <h3>Payoff Timeline Comparison</h3>
        <div className="chart">
          <Line ref={comparisonChartRef} data={comparisonData} options={options} />
        </div>
      </div>
    </section>
  );
};

export default LoanResults;