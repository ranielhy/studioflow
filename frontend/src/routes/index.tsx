import { Navigate } from "react-router-dom";

import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { PersonalizePage } from "../pages/personalize/PersonalizePage";
import { StudioPage } from "../pages/studio/StudioPage";
import { TemplateEditorPage } from "../pages/studio/TemplateEditorPage";
import { SliceEditorPage } from "../pages/studio/SliceEditorPage";

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
    path: "studio/templates/:templateId/slices/:sliceId",
    element: <SliceEditorPage />,
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
