import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PopupProvider } from "./contexts/PopupContext.jsx";
import { VoterProvider } from "./contexts/VoterContext.jsx";
import { OrganizationProvider } from "./contexts/OrganizationContext.jsx";
import { ElectionProvider } from "./contexts/ElectionContext.jsx";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <ElectionProvider>
        <OrganizationProvider>
          <VoterProvider>
            <PopupProvider>
              <App />
            </PopupProvider>
          </VoterProvider>
        </OrganizationProvider>
      </ElectionProvider>
    </LoadingProvider>
  </StrictMode>
);
