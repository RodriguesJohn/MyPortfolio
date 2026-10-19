import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import DesignEngineeringCoursePage from "./design-engineering-course/DesignEngineeringCoursePage.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DesignEngineeringCoursePage />
    <Analytics />
  </React.StrictMode>
);
