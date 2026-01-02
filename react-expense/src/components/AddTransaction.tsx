import { useState } from "react";
import type { Transaction } from "../types/Transaction";

interface Props {
  onAdd: (transaction: Transaction) => void;
}

export default function AddTransaction({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text || !amount) return;

    onAdd({
      id: Date.now(),
      text,
      amount: Number(amount)
    });

    setText("");
    setAmount("");
  };

  return (
    <section>
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button>Add Transaction</button>
      </form>
    </section>
  );
}
