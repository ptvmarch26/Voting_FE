import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PopupProvider } from "./contexts/PopupContext.jsx";
import { VoterProvider } from "./contexts/VoterContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VoterProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </VoterProvider>
  </StrictMode>
);
