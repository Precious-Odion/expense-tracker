const Balance = ({ balance, income, expense,formatMoney }) => {
    return (
        <div className="balance">
           <h2>Balance</h2> 
           <h1>{formatMoney(balance)}</h1>

           <div className="summary">
            <div className="income">
                <p>Income</p>
                <span>{formatMoney(income)}</span>
            </div>

            <div className="expense">
                <p>Expense</p>
                <span>{formatMoney(Math.abs(expense))}</span>
            </div>
           </div>
        </div>
    );
};

export default Balance;