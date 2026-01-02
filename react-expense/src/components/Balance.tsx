import type { Transaction } from "../types/Transaction";

interface BalanceProps {
    transactions: Transaction[];
}

export default function Balance({ transactions }: BalanceProps) {
    const total = transactions.map(t =>t.amount).reduce((acc, val) => acc + val, 0);

    return (
        <section className="balance">
            <h2>Your Balance</h2>
            <h3>₹{total.toFixed(2)}</h3>
        </section>
    )
}