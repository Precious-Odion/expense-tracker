const TransactionItem = ( {transaction, formatMoney }) => {
    const { title, amount, type, category } = transaction;

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
        </div>
    );
};

export default TransactionItem;