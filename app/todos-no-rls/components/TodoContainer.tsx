"use client";

import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";
const TodoContainer = () => {
  // 커스텀 훅 호출
  const { loading, todos } = useTodosController();
  return (
    <div>
      <TodoList
        sharedUserFullName="test"
        ownerUserId="123"
        loading={loading}
        todos={todos}
      />
    </div>
  );
};

export default TodoContainer;
