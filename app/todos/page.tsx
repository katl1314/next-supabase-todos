import React from "react";
import TodoContainer from "./components/TodoContainer";
/**
 * insert => 로그인 필요
 * update, delete => 모두 user_id가 필요해보임
 *
 */
const page = async () => {
  // 서버렌더링 장점 : DB직접접근, Data Fetch가능
  return (
    <div>
      <TodoContainer />
    </div>
  ); // 5초 후에 실행함.
};

export default page;
