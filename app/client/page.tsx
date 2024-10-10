import React from "react";
import ClientComponent from "./ClientComponent";

const page = () => {
  console.log("서버 컴포넌트 렌더링");
  return <ClientComponent />;
};

export default page;
