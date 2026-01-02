import { useEffect, useState } from "react";
import type { Transaction } from "./types/Transaction";
import Balance from "./components/Balance";
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return JSON.parse(localStorage.getItem("transactions") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <Balance transactions={transactions} />
      <Summary transactions={transactions} />
      <TransactionList transactions={transactions} />
      <AddTransaction onAdd={addTransaction} />
    </div>
  );
}

export default App;
