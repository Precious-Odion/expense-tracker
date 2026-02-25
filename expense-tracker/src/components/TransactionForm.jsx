import { useState, useEffect } from "react";

const TransactionForm = ({ onAdd, onUpdate, editingTransaction }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("General");

    useEffect(() => {
      if (editingTransaction) {
        setTitle(editingTransaction.title ?? "");
        setAmount(
          editingTransaction.amount !== undefined
            ? Math.abs(editingTransaction.amount)
            : ""
        );
        setType(editingTransaction.type ?? "income");
        setCategory(editingTransaction.category ?? "General");
      }
    }, [editingTransaction]);

    const [currency, setCurrency] = useState("USD");

    const currencySymbols = {
      NGN:  "₦", 
      USD:  "$", 
      EUR:  "€", 
      GBP:  "£", 
    };

    const formatNumber = (value) => {
      if (!value) return "";
      return Number(value).toLocaleString();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !amount)  return;
        
        const transactionData = {
          id: editingTransaction ? editingTransaction.id :Date.now(),
          title: title,
          amount: Number(amount) * (type === "expense" ? -1 : 1),
          type: type,
          category: category,
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
        className="title-input"
        type="text"
        placeholder="Enter description"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="amount-input"
        type="text"
        placeholder="Enter amount"
        value={
          amount
            ? `${currencySymbols[currency] || "$"} ${formatNumber(amount)}`
            : ""
        }
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^0-9]/g, "");
          setAmount(rawValue);
          }}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="shopping">Shopping</option>
        <option value="salary">Salary</option>
        <option value="utilities">Utilities</option> 
        <option value="general">General</option>
        <option value="Rent">Other</option>
      </select>

      <button type="submit">
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
);

};

export default TransactionForm;