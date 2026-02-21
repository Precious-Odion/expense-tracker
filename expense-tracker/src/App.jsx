import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import Balance from "./components/Balance";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deletedTransaction, setDeletedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [currency, setCurrency] = useState("USD");
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    closeModal();
  };

  const deleteTransaction = (id)=> {
    const txToDelete = transactions.find((tx) => tx.id === id);
    setDeletedTransaction(txToDelete);
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const undoDelete = () => {
    if (deletedTransaction) {
      setTransactions([...transactions, deletedTransaction]);
      setDeletedTransaction(null);
    }
  };

  const startEdit = (transaction) => {
    setEditingTransaction(transaction);
    openModal();
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prevTransactions) =>
        prevTransactions.map((tx) =>
          tx.id === updatedTx.id ? updatedTx : tx
      )
    );
    closeModal();
    setEditingTransaction(null);
  }

  const formatMoney = (amount) => {
    return new Intl.NumberFormat(
      currencies[currency].locale,
      {
        style: "currency",
        currency: currency,
      }
    ).format(amount);
  };

  const income = transactions
      .filter(tx => tx.amount > 0)
      .reduce((acc, tx) => acc + tx.amount, 0);
  
  const expense = transactions
      .filter(tx => tx.amount < 0)
      .reduce((acc, tx) => acc + tx.amount, 0);
  
  const balance = income + expense;

  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch =
      filterType === "all" || tx.type === filterType;
    
    const categoryMatch =
      filterCategory === "all" || tx.category === filterCategory;

    return typeMatch && categoryMatch;
  });

  const currencies = {
    NGN: { symbol: "₦", locale: "en-NG" },
    USD: { symbol: "$", locale: "en-US" },
    EUR: { symbol: "€", locale: "en-DE" },
    GBP: { symbol: "£", locale: "en-GB" },
  }

  return (
    <div className="app-container">

      <Header 
        balance={balance}
        currency={currency}
        setCurrency={setCurrency}
        formatMoney={formatMoney}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onAddClick={() => setShowModal(true)} 
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <TransactionForm
              editingTransaction={editingTransaction}
              onAdd={(tx) => 
                {addTransaction(tx);
                closeModal();
              }}
              onUpdate={(tx) => {
                updateTransaction(tx);
                setEditingTransaction(null);
                closeModal();
              }}
            />

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {deletedTransaction && (
        <div className="undo-notice">
          Transaction deleted.{" "}
          <button onClick={undoDelete}>Undo</button>
        </div>
      )}

      <div className="layout">
        {sidebarOpen && (
          <Sidebar
            income={income}
            expense={expense}
            balance={balance} 
            filterType={filterType}
            setFilterType={setFilterType}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        )}
       
        {showFilters && (
          <div className="filter-panel">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="salary">Salary</option>
              <option value="utilities">Utilities</option> 
              <option value="general">General</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
      <div className="content">
        <TransactionList 
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onEdit={startEdit}
        />
      </div>
      </div>
    </div>
  );

};

export default App;