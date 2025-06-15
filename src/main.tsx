import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import YupForm from "./YupForm.tsx";
import ZodForm from "./ZodForm.tsx";
import MUIForm from "./MUIForm.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MUIForm />
  </StrictMode>
);
