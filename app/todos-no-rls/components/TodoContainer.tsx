"use client";

import useTodosController from "../hooks/useTodosController";

const TodoContainer = () => {
  // 커스텀 훅 호출
  const { loading, todos } = useTodosController();
  console.log("loading ---", loading);
  console.log("todos ---", todos);
  return <div>TodoContainer</div>;
};

export default TodoContainer;
