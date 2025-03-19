// Selecting all elements with an ID
const inputText = document.getElementById("input-text");
const inputAmount = document.getElementById("input-amount");
const addNow = document.getElementById("add-now");
const transactionList = document.getElementById("transaction-list");
const total = document.getElementById("total");
const container = document.getElementById("container");
const select = document.querySelector("#select");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");

// Retrive stored transactions from Local Storage
const localSotredArray = JSON.parse(localStorage.getItem("localStoredArray"));
let storeArray = localSotredArray !== null ? localSotredArray : [];

function addTransaction(transaction) {
  const li = document.createElement("li");
  li.classList.add(`${transaction.amount > 0 ? "plus" : "minus"}`);
  li.innerHTML = `${transaction.text} <span>$${transaction.amount}</span ><span class="delete" data-id=${transaction.id}>Delete</span>`;
  transactionList.appendChild(li);
}

function updateValues() {
  const onlyAmt = storeArray.map((amt) => Number(amt.amount));
  const incomeCal = onlyAmt
    .filter((amt) => amt > 0)
    .reduce((acc, currentValue) => acc + currentValue, 0);
  const expenseCal = onlyAmt
    .filter((amt) => amt < 0)
    .reduce((acc, currentValue) => acc + currentValue, 0);
  const totalCal = onlyAmt.reduce((acc, currentValue) => acc + currentValue, 0);
  income.textContent = `: $ ${incomeCal.toFixed(2)}`;
  expense.textContent = `: $ ${expenseCal.toFixed(2)}`;
  total.textContent = `: $ ${totalCal.toFixed(2)}`;
}

function deleteItem(e) {
  if (e.target.classList.contains("delete")) {
    const id = +e.target.dataset.id;
    storeArray = storeArray.filter((item) => item.id !== id);
    init();
    saveTransactionToLocal();
  }
}

function saveTransactionToLocal() {
  localStorage.setItem("localStoredArray", JSON.stringify(storeArray));
}

function addNewTransaction() {
  const nameT = inputText.value.trim();
  const amountT = +inputAmount.value.trim();
  if (nameT === "" || isNaN(amountT) || amountT === 0) {
    alert("Please enter a  transaction name and value");
    return;
  }
  const newT = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text: nameT,
    amount: select.value === "income" ? amountT : -amountT,
  };
  storeArray.push(newT);
  inputText.value = "";
  inputAmount.value = "";
  saveTransactionToLocal();
  init();
}

// Attach event listiners

addNow.addEventListener("click", addNewTransaction);
transactionList.addEventListener("click", deleteItem);

function init() {
  transactionList.innerHTML = "";
  storeArray.forEach(addTransaction);
  updateValues();
  // Remove previous event listener to prevent multiple bindings
}

// Inititalize app
init();
