// alert("Is this page linked??");

const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

console.log;

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);
// console.log(loanAmount);
// console.log(interestRate);
// console.log(loanTenure);

// E = P * r * ( (1 + r)^n / ( (1 + r)^n - 1 ) )

// E = EMI
// P = Principal Loan Amount
// r = Rate of Interest calculated on Monthly Basis
// n = Loan Tenure

let interest = interestRate / 12 / 100;
let myChart;

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  let regexDecimalNumber = /^(\d*\.)?\d+$/;

  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "10000";
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = 12;
  }

  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = 7.5;
  }
};

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart");

  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const calculateEMI = () => {
  refreshInputValues();
  checkValues();
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, loanTenure) /
      (Math.pow(1 + interest, loanTenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(loanTenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);
