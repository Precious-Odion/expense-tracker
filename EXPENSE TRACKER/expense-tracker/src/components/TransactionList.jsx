import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions = [], onDelete, onEdit }) => {
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
                    onDelete={onDelete} 
                    onEdit={onEdit}
                />
            ))
            )}
        </div>
    );
};

export default TransactionList;