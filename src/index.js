
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { UserProvider } from './providers/userProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <UserProvider> {/* Wrap your App component with UserProvider */}
    <App />
  </UserProvider>
</React.StrictMode>
);

