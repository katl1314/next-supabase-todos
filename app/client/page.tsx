import React from "react";
import ClientComponent from "./ClientComponent";
import { getTodos } from "@/actions/todos/todos.actions";

const page = async () => {
  // console.log("서버 컴포넌트 렌더링");
  // SSR에서 ServerAction 함수 호출
  const data = await getTodos();
  console.log(data);
  return (
    <div>
      <ClientComponent />
      <ul>
        {data.data?.map((data, index) => {
          return <li key={index}>{data.content}</li>;
        })}
      </ul>
    </div>
  );
};

export default page;
