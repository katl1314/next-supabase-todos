"use client";

import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";
import { createTodos, softDeleteTodos, updateTodos } from "@/apis/todos-no-rls";
const TodoContainer = () => {
  // 커스텀 훅 호출
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  } = useTodosController();

  // Todo 업데이트
  const handleUpdate = (id: number, content: string) => {
    // console.log("update", id, content);
    onUpdateTodos(id, content);
  };

  // Todo 삭제
  const handleDelete = (id: number) => {
    console.log("delete", id);
    onDeleteTodos(id);
  };

  // Todo 생성
  const handleCreate = () => {
    console.log("create");
    onCreateEmptyTodos();
  };

  // Todo 검색
  const handleSearch = (content: string) => {
    console.log("search", content);
    onSearchTodos(content); // LIKE 검색
  };

  return (
    <div>
      <TodoList
        sharedUserFullName="test"
        ownerUserId="123"
        loading={loading}
        todos={todos}
        isReadonly={false}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default TodoContainer;
