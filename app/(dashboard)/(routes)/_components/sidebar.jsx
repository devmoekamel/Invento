import { ArrowRightLeft, PackageOpen, TicketPercent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { pageMenu } from "./AppTabs";

const sidebar = () => {
  const router = useRouter();
  const [currentPage, setPage] = useState(0);

  const handleClick = (key, page) => {
    setPage(key);
    router.push("/" + page);
  };
  return (
    <div className="w-full h-full border-r shadow-lg">
      <Link href={"/"} className="flex items-center gap-x-5 my-5 px-4">
        <img src="./logo.svg" alt="" />
        <h1 className="text-3xl font-bold">Invento</h1>
      </Link>
      <div className={"flex flex-col gap-y-5 mt-10  py-5 "}>
        {pageMenu.map((page, key) => (
          <button
            key={key}
            onClick={() => handleClick(page.id, page.name)}
            className={`flex items-center gap-x-5 p-5  duration-500 ${
              currentPage == key ? "bg-violet-700 text-white" : ""
            }`}
          >
            <page.icon width={30} />
            <h1 className="font-bold">{page.name}</h1>
          </button>
        ))}
      </div>
    </div>
  );
};

export default sidebar;
