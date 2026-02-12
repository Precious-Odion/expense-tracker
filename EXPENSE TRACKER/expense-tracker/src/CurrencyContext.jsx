import { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("GBP");

    const currencies = {
        NGN: { symbol: "₦", locale: "en-NG" },
        USD: { symbol: "$", locale: "en-US" },
        EUR: { symbol: "€", locale: "en-DE" },
        GBP: { symbol: "£", locale: "en-GB" },
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat(currencies[currency].locale, {
            style: "currency",
            currency: currency,
        }).format(amount);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatMoney }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};