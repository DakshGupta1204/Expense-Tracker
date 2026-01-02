import type { Transaction } from "../types/Transaction";

export default function TransactionItem({ text, amount }: Transaction) {
  const sign = amount < 0 ? "-" : "+";

  return (
    <li className={amount < 0 ? "minus" : "plus"}>
      {text}
      <span>
        {sign}₹{Math.abs(amount)}
      </span>
    </li>
  );
}
