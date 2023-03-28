import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedStack from "./components/ProtectedStack";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { getAuthorizationStatus } from "./utils/getAuthorizationStatus";

export default function App() {
  const navigation = useNavigate();

  useEffect(() => {
    const status = getAuthorizationStatus();
    if (status) {
      navigation("/dashboard/task");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedStack />}>
        <Route path="/dashboard/task" element={<Tasks />} />
      </Route>
    </Routes>
  );
}
