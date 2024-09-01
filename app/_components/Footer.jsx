"use client";

import { Heart } from "lucide-react";
import React from "react";

function Footer() {
  return (
      <div className="my-10">
        <div className=" flex justify-center items-center">
          <h1 className="flex gap-1">
            Made with
            <span>
              <Heart className="text-red-600" />
            </span>
            By
            <span className="text-blue-700 hover:text-rose-700 duration-700">
              <a href="https://github.com/devmoekamel"> Mohamed Kamel</a>
            </span>
          </h1>
        </div>
      </div>
  );
}

export default Footer;
