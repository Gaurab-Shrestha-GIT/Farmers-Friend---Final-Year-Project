import React from "react";
import { Outlet } from "react-router-dom";
import FarmerFooter from "./FarmerFooter";
import FarmerHeader from "./FarmerHeader";

const Farmer = () => {
  return (
    <>
      <title>Farmer Dashboard | Farmer's Friend</title>
      <FarmerHeader />
      <Outlet />
      <FarmerFooter />
    </>
  );
};

export default Farmer;
