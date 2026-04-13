import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrencyProvider } from "./CurrencyContext";
import "./index.css";
import { TransactionProvider } from "./TransactionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </CurrencyProvider>
  </React.StrictMode>,
);
