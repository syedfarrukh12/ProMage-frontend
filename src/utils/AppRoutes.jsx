import React from "react";
import { Route, Routes } from "react-router-dom";
import Project from "../pages/Project/Project.jsx";

const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard.jsx"));
const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/projects/:id" element={<Project />} />
      {/* <Route exact path="/project" element={<InviteRegistration />} /> */}
      {/* <Route exact path="/invite/direct/:code" element={<InviteRegistration />} /> */}
    </Routes>
  );
};

export default AppRoutes;
