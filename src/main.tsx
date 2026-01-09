import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RangeSlider from "./RangeSlider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RangeSlider />
    </StrictMode>
);
