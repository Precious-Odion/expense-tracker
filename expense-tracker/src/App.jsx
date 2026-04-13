import { useState } from "react";
import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import ExpenseChart from "./components/ExpenseChart";

const App = () => {
  const {
    transactions,
    archivedTransactions,
    deletedTransactions,
    editingTransaction,
    addTransaction,
    deleteTransaction,
    archiveTransaction,
    undoDelete,
    undoArchive,
    startEdit,
    updateTransaction,
    income,
    expense,
    balance,
    undoAction,
  } = useContext(TransactionContext);
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [view, setView] = useState("active");

  const displayedTransactions =
    view === "archived"
      ? archivedTransactions
      : view === "deleted"
        ? deletedTransactions
        : transactions;

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const [currency, setCurrency] = useState("USD");

  const formatMoney = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch = filterType === "all" || tx.type === filterType;

    const categoryMatch =
      filterCategory === "all" || tx.category === filterCategory;

    return typeMatch && categoryMatch;
  });

  const currencies = {
    NGN: { symbol: "₦", locale: "en-NG" },
    USD: { symbol: "$", locale: "en-US" },
    EUR: { symbol: "€", locale: "en-DE" },
    GBP: { symbol: "£", locale: "en-GB" },
  };

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
              key={editingTransaction ? editingTransaction.id : "new"}
              editingTransaction={editingTransaction}
              onAdd={addTransaction}
              onUpdate={updateTransaction}
              closeModal={closeModal}
            />

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {undoAction && (
        <div className="snackbar">
          {undoAction === "delete"
            ? "Transaction Deleted"
            : "Transaction Archived"}
          <button onClick={undoAction === "delete" ? undoDelete : undoArchive}>
            Undo
          </button>
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
            setView={setView}
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
            </select>
          </div>
        )}
        <div className="content">
          {view === "charts" ? (
            <>
              <h2 className="chart-header">Charts</h2>
              <ExpenseChart transactions={transactions} />
            </>
          ) : (
            <TransactionList
              transactions={displayedTransactions}
              formatMoney={formatMoney}
              currency={currency}
              onDelete={deleteTransaction}
              onEdit={(tx) => {
                startEdit(tx);
                setShowModal(true);
              }}
              onArchive={archiveTransaction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
