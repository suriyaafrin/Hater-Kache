import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes.jsx";
import { AppProvider } from "./store/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={routes} />
    </AppProvider>
  </StrictMode>
);
