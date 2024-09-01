"use client";
import React, { useEffect, useState } from "react";
import { StockCategories } from "../Inventory/Data/StockCategories";
import { useDispatch, useSelector } from "react-redux";
import { createOffer } from "@/app/store/offerSlice";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const CreateOffer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [init, setinit] = useState(false);
  const [token, settoken] = useState(null);
  const [offer, setOffer] = useState({
    offerName: "",
    offerType: "",
    offerAmount: 0,
    offerPrice: 0,
  });
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !init) {
      settoken(savedToken);
      setinit(true);
    }
  }, [init]);
  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createofferPromise =  dispatch(createOffer({ token, data: offer })).unwrap();
    toast.promise(
      createofferPromise,
      {
        loading: "Creating offer...",
        success: "Offer created successfully!",
        error: "Failed to create offer. Please try again!",
      },
      {
        position: "top-right",
      }
    );
  };

  return (
    <div className="m-16 container mx-auto">
      <Toaster/>
      <div className="my-7 flex justify-center items-center">
        <h1 className="text-3xl font-bold">Create Offer</h1>
      </div>
      <div className="p-3 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="offerName"
            >
              Offer Name
            </label>
            <input
              id="offerName"
              name="offerName"
              type="text"
              value={offer.offerName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter offer name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="offerType"
            >
              Offer Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="offerType"
              id="offerType"
              value={offer.offerType}
              onChange={handleChange}
              required
            >
              <option>choose Category</option>
              {StockCategories.map((item, key) => (
                <option key={key} value={item.key}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="offerAmount"
            >
              Offer Amount
            </label>
            <input
              id="offerAmount"
              name="offerAmount"
              type="number"
              value={offer.offerAmount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter offer amount"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="offerPrice"
            >
              Offer Price
            </label>
            <input
              id="offerPrice"
              name="offerPrice"
              type="number"
              value={offer.offerPrice}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter offer price"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
