"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Header = () => {
  const router = useRouter();
  const [text] = useTypewriter({
    words: ["Margin", "Reach ", "Scope"],
    loop: {},
  });
  const memoizedImage = useMemo(
    () => (
      <Image
        className=""
        alt="header image"
        src={"./header.svg"}
        width={450}
        height={450}
      />
    ),
    []
  );
  useEffect(() => {}, [text]);
  const handleClick = () => {
    if (localStorage.getItem("token") == null) {
      router.push("/Login");
    } else {
      router.push("/Inventory");
    }
  };

  return (
    <div className="container mx-auto mt-7">
      <div className="flex flex-col-reverse gap-y-7  md:flex-row justify-around items-center">
        <div className="flex flex-col gap-y-5 text-center md:text-start">
          <h1 className="text-2xl  md:text-3xl font-bold line-clamp-2">
            Through <span className="text-violet-700">Invento</span> Now You Can
          </h1>
          <h1 className="text-2xl  md:text-3xl font-bold ">
            Expand Your Bussiness{" "}
            <span className="text-violet-700">{text} </span>
            <Cursor cursorStyle="|" />
          </h1>
          <button
            onClick={() => handleClick()}
            className="px-6 py-3 self-center md:self-start text-white rounded-full bg-violet-500  duration-500 hover:bg-violet-700"
          >
            Start Now
          </button>
        </div>
        <div className="">{memoizedImage}</div>
      </div>
    </div>
  );
};

export default Header;
