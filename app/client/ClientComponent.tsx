"use client";

import React from "react";
import { ping } from "@/actions/ping.actions"; // serverAction 함수

const ClientComponent = () => {
  (async () => {
    const data = await ping(); // 서버에서 실행한 결과를 클라이언트 컴포넌트에 가져왓!
    console.log(data);
  })();
  console.log("클라이언트 컴포넌트입니다.");
  return <div>클라이언트 컴포넌트입니다.~</div>;
};

export default ClientComponent;
