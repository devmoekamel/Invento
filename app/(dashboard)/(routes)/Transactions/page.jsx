"use client";
import { getAllTransaction } from "@/app/store/transactionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Transactions = () => {
  const { transactions } = useSelector((state) => state.transaction);
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
      dispatch(getAllTransaction(token));
    }
  }, [token, dispatch]);
  transactions;
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                From
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                To
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-900">
                Offer Type
              </th>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((item, key) => (
              <tr key={key} className="hover:bg-gray-100">
                <td
                  className={`px-4 py-2  ${
                    item.from.username === username
                      ? "text-violet-700"
                      : "text-gray-900"
                  }`}
                >
                  {item.from.username}
                </td>
                <td
                  className={`px-4 py-2  ${
                    item.to.username === username
                      ? "text-violet-700"
                      : "text-gray-900"
                  }`}
                >
                  {item.to.username}
                </td>
                <td className={`"px-4 py-2 text-gray-700 `}>
                  {item.offerId.offerType}
                </td>
                <td className={`"px-4 py-2 text-gray-700 `}>
                  {item.offerId.offerName}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {item.offerId.offerAmount}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  {item.offerId.offerPrice}$
                </td>
                <td className="px-4 py-2 text-gray-700">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
