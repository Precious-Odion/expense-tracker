import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import Balance from "./components/Balance";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [deletedTransaction, setDeletedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

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
    setShowModal(true);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(
      transactions.map((tx) =>
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
        onAddClick={openModal} 
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <TransactionForm
              onAdd={(tx) => 
                {addTransaction(tx);
                closeModal();
              }}
              onUpdate={(tx) => {
                updateTransaction(tx);
                closeModal();
                setEditingTransaction(null);
              }}
              editingTransaction={editingTransaction}
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

      <Balance
        balance={balance}
        income={income}
        expense={expense}
        formatMoney={formatMoney}
      />

      <div className="main">
        <Sidebar />
        <TransactionList 
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={startEdit}
        />
      </div>
    </div>
  );

};

export default App;