"use client";
import React, { useState } from "react";
import WelcomSection from "./_components/welcomSection";
import StockSection from "./_components/StockSection";
import UpdateStockSection from "./_components/updateStockSection";
const Inventory = () => {
  return (
    <div className="m-16">
      <WelcomSection />
      <UpdateStockSection />
      <StockSection />
    </div>
  );
};

export default Inventory;
