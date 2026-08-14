import { Navigate, Route, Routes } from "react-router-dom";

import { StudioPage } from "./pages/studio/StudioPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/studio" replace />}
      />

      <Route
        path="/studio"
        element={<StudioPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/studio" replace />}
      />
    </Routes>
  );
}
