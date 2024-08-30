import React from "react";
import { useSelector } from "react-redux";

const WelcomSection = () => {
  const { username } = useSelector((state) => state.inventory);
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Welcome,{username || "user"}🎉</h1>
    </div>
  );
};

export default WelcomSection;
