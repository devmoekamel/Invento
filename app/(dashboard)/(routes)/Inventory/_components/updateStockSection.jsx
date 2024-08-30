import React, { useState } from "react";
import { StockCategories } from "../Data/StockCategories";
import UpdateModal from "./updateModal";

const updateStockSection = () => {
  const [OpenModal, SetModalState] = useState(false);
  return (
    <div className="my-7 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Your Stock : </h1>
      </div>
      <div className="text-white">
        <button
          onClick={() => SetModalState(true)}
          className="px-6 py-2 bg-green-600 rounded-full"
        >
          Update Stock
        </button>
      </div>
      {OpenModal && <UpdateModal cancelModal={() => SetModalState(false)} />}
    </div>
  );
};

export default updateStockSection;
