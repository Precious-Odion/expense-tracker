import { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("USD");

    const localeMap = {
        NGN: "en-NG",
        USD: "en-US",
        EUR: "en-DE",
        GBP: "en-GB",
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat(localeMap[currency], {
            style: "currency",
            currency,
        }).format(amount);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatMoney }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};