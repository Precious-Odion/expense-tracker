import { useState, useEffect } from "react";

const TransactionForm = ({ onAdd, onUpdate, editingTransaction }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("General");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount)  return;
        
        const transactionData = {
          id: editingTransaction ? editingTransaction.id :Date.now(),
          title,
          amount: Number(amount) * (type === "expense" ? -1 : 1),
          type,
          category,
          date: new Date().toISOString().split("T")[0],
        };

        if (editingTransaction) {
          onUpdate(transactionData);
        } else {
          onAdd(transactionData);
        }
        
        setTitle("");
        setAmount("");
        setType("income");
        setCategory("General");
    };

return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter description"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Rent">Rent</option>
        <option value="Utilities">Utilities</option>
      </select>

      <button type="submit">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
);

};

export default TransactionForm;