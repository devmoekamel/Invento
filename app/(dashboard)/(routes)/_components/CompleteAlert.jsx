import { CircleCheckBig, X } from "lucide-react";
import React from "react";

const CompleteAlert = () => {
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100  bg-white p-4"
    >
      <div className="flex items-start gap-4">
        <span className="text-green-600">
          <CircleCheckBig />
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            {" "}
            Mission Completed{" "}
          </strong>

          <p className="mt-1 text-sm text-gray-700">
            Your Action have been done.
          </p>
        </div>

        <button className="text-gray-500 transition hover:text-gray-600">
          <span className="sr-only">Dismiss popup</span>

          <X />
        </button>
      </div>
    </div>
  );
};

export default CompleteAlert;
