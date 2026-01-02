import type { Transaction } from "../types/Transaction";
import TransactionItem from "./TransactionItem";

interface Props {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: Props) {
  return (
    <section>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(t => (
          <TransactionItem key={t.id} {...t} />
        ))}
      </ul>
    </section>
  );
}
