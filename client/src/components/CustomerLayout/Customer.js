import React from "react";
import { Outlet } from "react-router-dom";
import CustomerFooter from "./CustomerFooter";
import CustomerHeader from "./CustomerHeader";

const Customer = () => {
  return (
    <>
      <CustomerHeader />
      <Outlet />
      <CustomerFooter />
    </>
  );
};

export default Customer;
