"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

// page.tsx가 서버에서 렌더링이 되는 동안에 대신 표시함.
const loading = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader />
      </div>
    </div>
  );
};

export default loading;
