"use client";
import { AcceptUserOffer, getAllOffers } from "@/app/store/offerSlice";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const Offers = () => {
  const { offers } = useSelector((state) => state.offer);
  const { username } = useSelector((state) => state.inventory);

  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !isInitialized) {
      setToken(savedToken);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (token) {
      dispatch(getAllOffers(token));
    }
  }, [token, dispatch]);

  const AcceptOffer = (offerid) => {
    // console.log(offerid);
    const AcceptOfferPromise = dispatch(
      AcceptUserOffer({ token, data: { offerId: offerid } })
    )
      .unwrap()
      .then(() => {
        // Re-fetch offers list after successfully accepting an offer
        dispatch(getAllOffers(token));
      });
    toast.promise(
      AcceptOfferPromise,
      {
        loading: "Accepting Offer...",
        success: "Offer Accepted successfully!",
        error: "failed to accept The Offer. Please try again!",
      },
      {
        position: "top-right",
      }
    );
  };

  return (
    <div className="p-4">
      <Toaster />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                From
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900"></th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Offer Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Offer Amount
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Offer Price
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Date
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {offers.map((item, key) => (
              <tr key={key} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-capitalize text-violet-700 ">
                  {item.userId.username}
                </td>
                <td
                  className={`px-4 py-2 
                   text-gray-900
                `}
                ></td>
                <td className="px-4 py-2 text-gray-700 ">{item.offerName}</td>
                <td className="px-4 py-2 text-gray-700"> {item.offerAmount}</td>
                <td className="px-4 py-2 text-gray-700">{item.offerPrice}$</td>
                <td className="px-4 py-2 text-gray-700">{item.date}</td>
                <td className="px-4 py-2 text-white">
                  <button
                    onClick={() => AcceptOffer(item._id)}
                    className="px-5 py-2 bg-violet-700 rounded-xl "
                  >
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offers;
