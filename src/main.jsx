import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApplicationProvider } from './context/ApplicationContext.jsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApplicationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApplicationProvider>
  </StrictMode>,
);
