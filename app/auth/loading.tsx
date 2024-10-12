"use client";
import React from "react";
import { DotLoader } from "react-spinners";

// page.tsx가 서버에서 렌더링이 되는 동안에 대신 표시함. React Suspense을 통해서 처리함.
const Loading = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <DotLoader />
      </div>
      <div className="font-bold my-2">There is something loading...</div>
    </div>
  );
};

export default Loading;
