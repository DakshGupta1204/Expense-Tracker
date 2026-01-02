import type { Transaction } from "../types/Transaction";

interface Props{
    transactions: Transaction[];
}

export default function Summary({transactions}:Props){
    const amounts = transactions.map(t=>t.amount);
    const income = amounts.filter(a=>a>0).reduce((acc,val)=>acc+val,0);
    const expense = amounts.filter(a=>a<0).reduce((acc,val)=>acc+val,0);
    return (
    <section className="summary">
      <div>
        <h4>Income</h4>
        <p className="money plus">₹{income.toFixed(2)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">
          ₹{Math.abs(expense).toFixed(2)}
        </p>
      </div>
    </section>
  );
}