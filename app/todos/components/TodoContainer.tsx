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
  } = useTodosController(ownerUserId); // 실제 Supabase 데이터베이스와 통신

  /////////////////////// Event Handler /////////////////////
  // Todo 업데이트
  const handleUpdate = (id: number, content: string) => {
    onUpdateTodos(id, content);
  };

  // Todo 삭제
  const handleDelete = (id: number) => {
    onDeleteTodos(id);
  };

  // Todo 생성
  const handleCreate = () => {
    onCreateEmptyTodos();
  };

  // Todo 검색
  const handleSearch = (content: string) => {
    onSearchTodos(content); // LIKE 검색
  };

  return (
    <div>
      <TodoList
        sharedUserFullName={sharedUserFullName}
        ownerUserId={ownerUserId}
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
