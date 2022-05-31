import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

const Admin = () => {
  return (
    <div>
      <title>Admin Dashboard | Farmer's Friend</title>
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </div>
  );
};

export default Admin;
