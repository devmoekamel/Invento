"use client";
import React, { useState } from "react";
import Sidebar from "./_components/sidebar";
import MobileBar from "./_components/mobileBar";
import CompleteAlert from "./_components/CompleteAlert";
import { useSelector } from "react-redux";
const layout = ({ children }) => {
  const { stockReq } = useSelector((state) => state.inventory);
  return (
    <div className="overflow-hidden ">
      {/* //sidebar */}
      <div className=" hidden lg:fixed lg:block md:w-64 md:h-full">
        <Sidebar />
      </div>
      {/* //phone bar */}
      <div className="block fixed bottom-0 left-0 w-full h-28 z-50 border-gray-600 lg:hidden  ">
        <MobileBar />
      </div>
      <div className={"ml-0 lg:ml-64"}>{children}</div>
    </div>
  );
};

export default layout;
