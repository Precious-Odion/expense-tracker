import { useContext } from "react";
import { CurrencyContext } from "../CurrencyContext";


const Header = ({ balance, onAddClick }) => {
    const { currency, setCurrency, formatMoney } = useContext(CurrencyContext)
    return (
        <header className="header-section">
            <h1>Expense Tracker</h1>

            <div className="header-right">
                <div className="balance">
                    <span>Total Balance</span>
                    <h2>{formatMoney(balance)}</h2>
                </div>
                
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="currency-select"
                >
                    <option value="NGN">₦ NGN</option>
                    <option value="USD">$ USD</option>
                    <option value="GBP">£ GBP</option>
                    <option value="EUR">€ EUR</option>
            
                </select>

                <button className="add-btn" onClick={onAddClick}>
                    + Add Transaction
                </button>
            </div>
        </header>
    );
};

export default Header;