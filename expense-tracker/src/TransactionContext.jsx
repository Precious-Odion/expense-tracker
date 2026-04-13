import { use } from "react";
import { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [deletedTransactions, setDeletedTransactions] = useState([]);
  const [archivedTransactions, setArchivedTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [undoAction, setUndoAction] = useState(null);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    const txToDelete = transactions.find((tx) => tx.id === id);

    if (!txToDelete) return;

    setDeletedTransactions((prev) => [...prev, txToDelete]);
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));

    setUndoAction("delete");

    setTimeout(() => {
      setUndoAction(null);
    }, 4000);
  };

  const archiveTransaction = (id) => {
    const txToArchive = transactions.find((tx) => tx.id === id);

    if (!txToArchive) return;

    setArchivedTransactions((prev) => [...prev, txToArchive]);
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));

    setUndoAction("archive");

    setTimeout(() => {
      setUndoAction(null);
    }, 4000);
  };

  const undoArchive = () => {
    if (archivedTransactions.length === 0) return;

    const lastArchived = archivedTransactions[archivedTransactions.length - 1];

    setTransactions((prev) => [lastArchived, ...prev]);
    setArchivedTransactions((prev) => prev.slice(0, prev.length - 1));

    setUndoAction(null);
  };

  const undoDelete = () => {
    if (deletedTransactions.length === 0) return;

    const lastDeleted = deletedTransactions[deletedTransactions.length - 1];

    setTransactions((prev) => [lastDeleted, ...prev]);
    setDeletedTransactions((prev) => prev.slice(0, prev.length - 1));

    setUndoAction(null);
  };

  const startEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx)),
    );
    setEditingTransaction(null);
  };

  const activeTransactions = transactions;

  const income = activeTransactions
    .filter((tx) => tx.amount > 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expense = activeTransactions
    .filter((tx) => tx.amount < 0)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const balance = income + expense;

  return (
    <TransactionContext.Provider
      value={{
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
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
