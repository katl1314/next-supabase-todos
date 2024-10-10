"use client";

import React, { useEffect } from "react";
import { getTodoList } from "@/actions/todos/todos.actions"; // serverAction 함수

const ClientComponent = () => {
  // useEffect(() => {
  //   (async () => {
  //     const data = await getTodoList(); // 서버에서 실행한 결과를 클라이언트 컴포넌트에 가져왓!
  //     console.log(data);
  //   })();
  // }, []);
  console.log("클라이언트 컴포넌트입니다.");
  return <div>클라이언트 컴포넌트입니다.~</div>;
};

export default ClientComponent;
