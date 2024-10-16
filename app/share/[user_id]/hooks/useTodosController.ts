import { useState, useEffect, useCallback } from "react";
import { Database } from "@/database.types";
import {
  createTodos,
  getTodoByUserId,
  updateTodos,
  softDeleteTodos,
  getTodosBySearch,
  getTodosById,
} from "@/actions/todos/todos.actions"; // Server Action을 실행한다.

type TodosType = Database["public"]["Tables"]["todos_with_rls"]["Row"];

// 커스텀훅 생성
// Todos을 가져오거나 생성, 업데이트, 삭제
const useTodosController = (userId: string) => {
  // 로딩 상태
  const [loading, setLoading] = useState(true); // false시 empty표시 후 loading 표시 후 데이터를 그린다.
  // Todos 리스트
  const [todos, setTodos] = useState<TodosType[]>([]);

  // 리액트는 컴포넌트가 렌더링될때 함수를 실행하기 때문에 함수는 객체이므로 메모이제이션을 사용해야한다. (재사용)
  const onGetTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTodoByUserId(userId);
      setTodos((data.data as TodosType[]) ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      // 데이터 조회가 끝나는 시점 (무조건 실행)
      setLoading(false);
    }
  }, [setLoading, setTodos, userId]);

  useEffect(() => {
    onGetTodos();
  }, [onGetTodos]); // 초기 렌더링시 콜백 실행함.

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
    if (!!search === false) {
      await onGetTodos(); // 검색어가 없으면 모든 데이터를 가져온다.
    } else {
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
