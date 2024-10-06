import { useState, useEffect } from "react";
import { Database } from "@/database.types";
import {
  createTodos,
  getTodos,
  updateTodos,
  softDeleteTodos,
  getTodosBySearch,
  getTodosById,
} from "@/apis/todos-no-rls";

type TodosType = Database["public"]["Tables"]["todos_no_rls"]["Row"];

// 커스텀훅 생성
// Todos을 가져오거나 생성, 업데이트, 삭제
const useTodosController = () => {
  // 로딩 상태
  const [loading, setLoading] = useState(true); // false시 empty표시 후 loading 표시 후 데이터를 그린다.
  // Todos 리스트
  const [todos, setTodos] = useState<TodosType[]>([]);

  const onGetTodos = async () => {
    try {
      setLoading(true);
      const { data } = await getTodos();
      setTodos((data as TodosType[]) ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      // 데이터 조회가 끝나는 시점 (무조건 실행)
      setLoading(false);
    }
  };
  useEffect(() => {
    onGetTodos();
  }, []); // 초기 렌더링시 콜백 실행함.

  // 비어있는 todo 생성
  const onCreateEmptyTodos = async () => {
    await createTodos(""); // todos를 추가하자.
    await onGetTodos(); // todos를 가져오자.
  };

  // todos 업데이트
  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content); // 특정 id의 데이터를 변경하자.
    await onGetTodos(); // todos를 가져오자.
  };

  // todos 삭제 (소프트 삭제)
  const onDeleteTodos = async (id: number) => {
    await softDeleteTodos(id);
    await onGetTodos();
  };

  // 검색 기능 LIKE
  const onSearchTodos = async (search: string) => {
    if (!!search === false) return;
    {
      const { data } = await getTodosBySearch(search); // 조회한 데이터를 setTodos에 전달한다.
      setTodos(data as TodosType[]);
    }
  };

  // 특정 id의 todo 가져오기
  const onGetTodoById = async (id: number) => {
    if (id > -1) {
      const { data } = await getTodosById(id); // 조회한 데이터를 setTodos에 전달한다.
      setTodos(data as TodosType[]);
    }
  };

  return {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
    onGetTodoById,
  };
};

export default useTodosController;
