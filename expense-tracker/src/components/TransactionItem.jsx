import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

const TransactionItem = ({ transaction, onDelete, onEdit }) => {
    const { formatMoney } = useContext(CurrencyContext);
    const { id, title, amount, type, category } = transaction;

    return (
        <div className="transaction-item">
            <div>
                <p className="title">{title}</p>
                <span className="category">{category}</span>
            </div>

            <span className={`amount ${type}`}>
                {type === "expense" ? "-" : "+"}
                {formatMoney(Math.abs(amount))}
            </span>

            <button 
                className="delete-btn" 
                onClick={() => onDelete(transaction.id)}
            >
                ✖
            </button>

            <button 
                className="edit-btn"
                onClick={() => onEdit(transaction)}
            >
                Edit
            </button>
        </div>
    );
};

export default TransactionItem;