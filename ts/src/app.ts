// DOM Elements

const balance = document.getElementById('balance') as HTMLHeadElement;
const income = document.getElementById('income') as HTMLParagraphElement;
const expense = document.getElementById('expense') as HTMLParagraphElement;
const list = document.getElementById('transaction-list') as HTMLUListElement;
const form = document.getElementById('form') as HTMLFormElement;
const textInput = document.getElementById('text') as HTMLInputElement;
const amountInput = document.getElementById('amount') as HTMLInputElement;

//get transactions from local storage 
interface Transaction{
    id:number;
    text:string;
    amount:number;
}
let transactions:Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');

// Add transaction

function addTransaction(e: SubmitEvent):void{
    e.preventDefault();
    if(textInput.value.trim() === '' || amountInput.value.trim() === ''){
        alert("Please add the amount and description !!");
        return;
    }

    const transaction:Transaction = {
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


function addTransactionDOM(transaction:Transaction):void{
    const sign = transaction.amount > 0 ? "+":"-";
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? "minus":"plus");

    item.innerHTML = `${transaction.text} <span>${sign} ₹${Math.abs(transaction.amount)}</span>`;

    list.append(item);
}

function updateValues():void{
    const amounts = transactions.map(t=>t.amount);
    const total = amounts.reduce((acc,item)=>acc+item,0);
    const incomeTotal = amounts.filter(item=>item>0).reduce((acc,item)=>item+acc,0);
    const expenseTotal = amounts.filter(item=>item<0).reduce((acc,item)=>item+acc,0);

    balance.innerText = `₹${total.toFixed(2)}`;
    income.innerHTML = `₹${incomeTotal.toFixed(2)}`;
    expense.innerHTML = `₹${Math.abs(expenseTotal).toFixed(2)}`;

}


//Update local Storage 
function updateLocalStorage():void{
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

function init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener('submit',addTransaction);
init();