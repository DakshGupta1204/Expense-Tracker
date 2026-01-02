"use strict";
// DOM Elements
Object.defineProperty(exports, "__esModule", { value: true });
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('transaction-list');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
// Add transaction
function addTransaction(e) {
    e.preventDefault();
    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert("Please add the amount and description !!");
        return;
    }
    const transaction = {
        id: Date.now(),
        text: textInput.value,
        amount: Number(amountInput.value)
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    textInput.value = "";
    amountInput.value = "";
}
function addTransactionDOM(transaction) {
    const sign = transaction.amount > 0 ? "+" : "-";
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `${transaction.text} <span>${sign} ₹${Math.abs(transaction.amount)}</span>`;
    list.append(item);
}
function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0);
    const incomeTotal = amounts.filter(item => item > 0).reduce((acc, item) => item + acc, 0);
    const expenseTotal = amounts.filter(item => item < 0).reduce((acc, item) => item + acc, 0);
    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerHTML = `₹${incomeTotal.toFixed(2)}`;
    expense.innerHTML = `₹${Math.abs(expenseTotal).toFixed(2)}`;
}
//Update local Storage 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
form.addEventListener('submit', addTransaction);
init();
//# sourceMappingURL=app.js.map