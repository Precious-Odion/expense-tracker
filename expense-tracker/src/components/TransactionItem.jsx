import { useState } from "react";
import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

const TransactionItem = ({ transaction, onDelete, onEdit, onArchive }) => {
  const { formatMoney, currency } = useContext(CurrencyContext);
  const { title, amount, type } = transaction;

  const [showMenu, setshowMenu] = useState(false);

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };

  return (
    <div
      className={`transaction-item ${showMenu ? "open" : ""}`}
      onClick={toggleMenu}
    >
      <div className="transaction-info">
        <p>{transaction.title}</p>

        <span className={`amount ${type}`}>
          {type === "expense" ? "-" : "+"}
          {formatMoney(Math.abs(amount), currency)}
        </span>
      </div>

      {showMenu && (
        <div className="transaction-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(transaction);
            }}
          >
            ✏️
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction.id);
            }}
          >
            🗑
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive(transaction.id);
            }}
          >
            📦
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
