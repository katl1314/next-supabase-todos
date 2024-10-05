"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

interface IError {
  error: Error & { digest?: string };
  reset: () => void;
}

const error: React.FC<IError> = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader />
      </div>
      <div className="font-bold my-2">There is something wrong...</div>
    </div>
  );
};

export default error;
