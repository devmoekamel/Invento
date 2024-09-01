import React, { useEffect, useState } from "react";
import { StockCategories } from "../Data/StockCategories";
import { useDispatch } from "react-redux";
import { getIventory, UpdateIventory } from "@/app/store/inventorySlice";
import toast, { Toaster } from "react-hot-toast";

const UpdateModal = ({ cancelModal }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [formData, setFormData] = useState({
    food: 0,
    electronics: 0,
    medicine: 0,
    others: 0,
  });

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !isInitialized) {
      setToken(savedToken);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const HandleUpdate = () => {
    const updateInventoryPromise = dispatch(
      UpdateIventory({ token, data: formData })
    )
      .unwrap()
      .then(() => dispatch(getIventory(token)))
      .then(
        setTimeout(() => {
          cancelModal(); // Close the modal after 2 seconds
        }, 2000)
      );

    toast.promise(
      updateInventoryPromise,
      {
        loading: "Updating inventory...",
        success: "Inventory updated successfully!",
        error: "Update failed. Please try again!",
      },
      {
        position: "top-right",
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <Toaster /> {/* This will render toast notifications */}
      <div className=" bg-white border shadow-lg rounded-lg w-96 p-6">
        <h1 className="text-2xl font-bold">Update Stock</h1>
        <form>
          {StockCategories.map((item, key) => (
            <div key={key} className="my-4">
              <label className="mb-2">{item.name}</label>
              <input
                className="w-full p-2 border-2 border-gray-300 focus:border-none rounded"
                type="number"
                value={formData[item.key]}
                onChange={(e) => handleInputChange(item.key, e.target.value)}
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end items-center gap-x-2 text-white">
          <button
            onClick={HandleUpdate}
            className="px-3 py-3 bg-green-700 rounded-xl"
          >
            Update
          </button>
          <button
            onClick={cancelModal}
            className="px-3 py-3 bg-red-600 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
