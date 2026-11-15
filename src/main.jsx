import React from "react";
import reactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

reactDom.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
</React.StrictMode>,
);
