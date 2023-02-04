// Selecting the Input Fields

const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");
const err1 = document.getElementById("e1");
const err2 = document.getElementById("e2");
const err3 = document.getElementById("e3");
let loanEMIValue;
let totalInterestValue;
let totalAmountValue;

// Fetching the values from the Input Fields
function fetchValues() {
  loanEMIValue = document.querySctor(".loan-emi .value");
  totalInterestValue = document.querySelector(".total-interest .value");
  totalAmountValue = document.querySelector(".total-amount .value");
}

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

function elementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

const ansLoanEmi = elementFromHtml(`
    <div class="loan-emi">
      <h3>Loan EMI</h3>
      <div class="value"></div>
    </div>
`);

const ansInterest = elementFromHtml(`
    <div class="total-interest">
      <h3>Total Interest Payable</h3>
      <div class="value"></div>
    </div>
`);

const ansTotalAmount = elementFromHtml(`
    <div class="total-amount">
      <h3>Total Amount</h3>
      <div class="value"></div>
    </div>
`);

const ansLoanEmi2 = elementFromHtml(`
    <div class="loan-emi">
      <h3>Loan EMI</h3>
      <div class="value"></div>
    </div>
`);

console.log(ansLoanEmi);
console.log(ansInterest);
console.log(ansTotalAmount);
console.log(ansLoanEmi2);

const right = elementFromHtml(`
      <canvas id="myChart" width="400" height="400"></canvas>
`);

console.log(right);

let interest = interestRate / 12 / 100;
let myChart;

// For Input Validation

const checkValues = () => {
  flag = true;
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  let regexDecimalNumber = /^\d*\.?\d*$/;

  if (!loanAmountValue.match(regexNumber)) {
    err1.innerHTML = "Enter Valid Input";
    flag = false;
  } else {
    err1.innerHTML = "";
  }

  if (!loanTenureValue.match(regexNumber)) {
    err3.innerHTML = "Enter Valid Input";
    flag = false;
  } else {
    err3.innerHTML = "";
  }

  if (
    !interestRateValue.match(regexDecimalNumber) ||
    0 > interestRateValue >= 15
  ) {
    err2.innerHTML = "Enter Valid Input";
    flag = false;
  } else {
    err2.innerHTML = "";
  }

  return flag;
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
  // checkValues();

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
  if (checkValues()) {
    console.log("valid");

    document.getElementById("lft").appendChild(ansLoanEmi2);
    document.getElementById("lft").appendChild(ansInterest);
    document.getElementById("lft").appendChild(ansTotalAmount);
    document.getElementById("rght").appendChild(right);

    fetchValues();

    let emi = calculateEMI();
    updateData(emi);
  }
};

// init();

// Event Listener for the Button

calculateBtn.addEventListener("click", init);
