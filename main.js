// Selecting the Input Fields

const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

// Fetching the values from the Input Fields

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

//Fetching Calculate Button

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

// Formula and Calculation Part

// E = P * r * ( (1 + r)^n / ( (1 + r)^n - 1 ) )

// E = EMI
// P = Principal Loan Amount
// r = Rate of Interest calculated on Monthly Basis
// n = Loan Tenure

let interest = interestRate / 12 / 100;
let myChart;

// For Input Validation

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  let regexDecimalNumber = /^(\d*\.)?\d+$/;

  if (!loanAmountValue.match(regexNumber)) {
    loanAmountInput.value = "10000";
    refreshInputValues();
  }

  if (!loanTenureValue.match(regexNumber)) {
    loanTenureInput.value = 12;
    refreshInputValues();
  }

  if (!interestRateValue.match(regexDecimalNumber)) {
    interestRateInput.value = 7.5;
    refreshInputValues();
  }
};

// Fetching the Chart From CDN to display

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

// Updating the Chart in real time

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

// Calculating Actual Output

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

// Updating Values and Displaying it on the Page

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

// Refreshing the input values ion real time

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

// Initializing the whole process

const init = () => {
  let emi = calculateEMI();
  updateData(emi);
};

init();

// Event Listener for the Button

calculateBtn.addEventListener("click", init);
