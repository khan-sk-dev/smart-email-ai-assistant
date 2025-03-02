// Importing StrictMode from React to highlight potential problems in the application
import { StrictMode } from "react";

// Importing createRoot from ReactDOM to enable concurrent rendering
import { createRoot } from "react-dom/client";

// Importing global styles
import "./index.css";

// Importing the main App component
import App from "./App.jsx";

// Selecting the root element in the HTML file and rendering the React application inside it
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrapping the App component inside StrictMode to catch potential issues in development */}
    <App />
  </StrictMode>
);
