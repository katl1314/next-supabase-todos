"use client";

import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

interface TodoContainerProps {
  ownerUserId?: string;
  sharedUserFullName?: string;
}

const TodoContainer: React.FC<TodoContainerProps> = ({
  ownerUserId,
  sharedUserFullName,
}) => {
  // 커스텀 훅 호출
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  } = useTodosController(ownerUserId as string); // 실제 Supabase 데이터베이스와 통신

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
        sharedUserFullName={sharedUserFullName}
        ownerUserId={ownerUserId}
        loading={loading}
        todos={todos}
        isReadonly={true} // Shared 페이지는 읽기전용으로만 제공한다.
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default TodoContainer;
