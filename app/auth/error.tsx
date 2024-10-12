"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

// page.tsx에서 에러 발생시 표시함.
const Error = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader />
      </div>
      <div className="font-bold my-2">There is something wrong...</div>
    </div>
  );
};

export default Error;
