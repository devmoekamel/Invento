import { ArrowRightLeft, PackageOpen, TicketPercent } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { pageMenu } from "./AppTabs";

const MobileBar = () => {
  const [currentPage, setPage] = useState(0);
  const router = useRouter();

  const handleClick = (key, page) => {
    setPage(key);
    router.push("/" + page);
  };
  return (
    <div className="w-full h-full border-t shadow-lg">
      <div className="flex items-center gap-x-0.5 md:gap-x-0 md:justify-around pt-2">
        {pageMenu.map((page, key) => (
          <button
            key={key}
            onClick={() => handleClick(key, page.name)}
            className={`flex flex-col  items-center gap-y-2 p-2 md:p-3 rounded-xl  ${
              currentPage == page.id ? "bg-violet-700 text-white" : ""
            } `}
          >
            <page.icon />
            {page.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBar;
