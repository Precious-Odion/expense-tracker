import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

const TransactionItem = ({ transaction, onDelete, onEdit, onArchive }) => {
  const { formatMoney, currency } = useContext(CurrencyContext);
  const { title, amount, type } = transaction;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <p>{transaction.title}</p>

        <span className={`amount ${type}`}>
          {type === "expense" ? "-" : "+"}
          {formatMoney(Math.abs(amount), currency)}
        </span>
      </div>

      <div className="menu-wrapper" ref={menuRef}>
        <button className="menu-btn" onClick={toggleMenu}>
          ⋮
        </button>
      </div>

      {openMenu && (
        <div className="dropdown-menu">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(transaction);
            }}
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onArchive(transaction.id);
            }}
          >
            Archive
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(transaction.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
