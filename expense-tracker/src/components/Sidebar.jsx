import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";

const Sidebar = ({ 
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory, 
    income, 
    expense, 
    balance, 
}) => {
    const  { formatMoney } = useContext(CurrencyContext);

    return (
        <aside className="sidebar">
            
          <div className="sidebar-balance">
            <p className="balance-title">Balance</p>
            <h1 
                className={`balance-amount ${
                    balance < 0 ? "negative" : "positive"
                }`}
            > 
                {formatMoney(balance)}
            </h1>

            <div className="income-expense">
                <div>
                  <p>Income</p>
                  <span className="income-value">{formatMoney(income)}</span>
                </div>

                <div>
                  <p>Expense</p>
                  <span className="expense-value">{formatMoney(expense)}</span>
                </div>
            </div>
            
            <hr />
          </div>
            <h3>Filter Type</h3>
            <div className="filters">
            <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-type"
            >
                <option value="all">All Transactions</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
            </select>
                
            <h3>Category</h3>
    
            <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-category"
            >
                <option value="all">All Categories</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="salary">Salary</option>
                <option value="utilities">Utilities</option> 
                <option value="general">General</option>

            </select>
            </div>
        </aside>
    );
};

export default Sidebar;