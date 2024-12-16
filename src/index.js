import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { LocaleProvider } from "./contexts/LocaleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider defValue="ko">
    <App />
  </LocaleProvider>
);
