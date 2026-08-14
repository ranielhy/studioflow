import { Navigate } from "react-router-dom";

import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { PersonalizePage } from "../pages/personalize/PersonalizePage";
import { StudioPage } from "../pages/studio/StudioPage";
import { TemplateEditorPage } from "../pages/studio/TemplateEditorPage";

export const routes = [
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "studio",
    element: <StudioPage />,
  },
  {
    path: "studio/templates/:id",
    element: <TemplateEditorPage />,
  },
  {
    path: "personalize",
    element: <PersonalizePage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
