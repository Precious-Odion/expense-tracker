import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import Balance from "./components/Balance";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
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

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


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
              onAdd={(tx) => {
                addTransaction(tx);
                closeModal();
              }}
            />

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
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
          formatMoney={formatMoney} 
        />
      </div>
    </div>
  );

};

export default App;