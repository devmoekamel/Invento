"use client";
import { getIventory } from "@/app/store/inventorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StockCategories } from "../Data/StockCategories";

const StockSection = () => {
  const [token, setToken] = useState(null);
  const inventoryData = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only run this effect on the client side
    const savedToken = localStorage.getItem("token");
    if (savedToken && !isInitialized) {
      setToken(savedToken);
      setIsInitialized(true); // Set initialized to true to prevent duplicate requests
    }
  }, [isInitialized]);

  useEffect(() => {
    if (token) {
      dispatch(getIventory(token));
    }
  }, [token, dispatch]);
  return (
    <div className="mt-5">
      <div className="mt-5 grid grid-cols-1 gap-y-3 md:gap-x-4 md:grid-cols-2 lg:grid-cols-4">
        {StockCategories.map((item) => (
          <div
            key={item.id}
            className="bg-violet-700 border shadow-xl rounded-2xl h-40 p-5 relative"
          >
            <div className="flex items-center gap-x-4">
              <div className="flex items-center justify-center bg-white w-10 h-10 rounded-full text-center">
                <item.icon className="text-black" />
              </div>
              <h1 className="text-white font-bold text-2xl">{item.name}</h1>
            </div>
            <div className="mt-5 absolute bottom-7 right-7">
              <div className="bg-white px-2 py-3 rounded-xl flex items-center justify-center text-xl text-black font-bold">
                <h1>{inventoryData[item.key] || 0}</h1>
                {/* Access the correct inventory data */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSection;
