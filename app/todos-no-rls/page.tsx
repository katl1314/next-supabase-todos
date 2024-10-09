import { sleep } from "@/lib/utils";
import React from "react";
import TodoContainer from "./components/TodoContainer";

const page = async () => {
  // error.tsx는 표시할 때 throw new Error
  // throw new Error("aaa");
  // 서버렌더링 장점 : DB직접접근, Data Fetch가능
  await sleep(1500); // 서버 렌더링이 발생하는 동안 loading.tsx를 실행한다.
  return (
    <div>
      <TodoContainer />
    </div>
  ); // 5초 후에 실행함.
};

export default page;
