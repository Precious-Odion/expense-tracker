import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions = [], 
    formatMoney, 
    currency, 
    onDelete, 
    onEdit,
    onArchive 
    }) => {
        
    return (
        <div className="transactions">
            <h3>Transactions</h3>
            {transactions.length === 0 ? (
                <p className="empty">No transactions yet</p>
            ) : (

            transactions.map((tx) => (
                <TransactionItem 
                    key={tx.id} 
                    transaction={tx}
                    currency={currency}
                    formatMoney={formatMoney}
                    onDelete={onDelete} 
                    onEdit={onEdit}
                    onArchive={onArchive}
                />
            ))
            )}
        </div>
    );
};

export default TransactionList;