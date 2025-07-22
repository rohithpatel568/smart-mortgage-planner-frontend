export const calculateLoan = (principal, annualRate, years, extraPayment = 0) => {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  let balance = principal;
  let totalInterest = 0;
  const schedule = [];
  let months = 0;

  while (balance > 0 && months < totalPayments) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest + extraPayment;
    balance -= principalPayment;
    if (balance < 0) balance = 0;
    totalInterest += interest;
    schedule.push({ month: months + 1, balance, interest, principal: principalPayment });
    months++;
  }

  return { monthlyPayment, totalInterest, schedule, payoffMonths: months };
};

export const calculateWithoutExtra = (principal, annualRate, years) => {
  return calculateLoan(principal, annualRate, years, 0);
};