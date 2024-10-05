"use client";
import { createSupabaseBrowerClient } from "@/lib/client/supabase";

// 브라우저 안에서 동작한다. (기본은 서버에서 동작하는것으로 간주함.)

// TodoList 가져오기
export const getTodos = async () => {
  const supabase = createSupabaseBrowerClient();
  // .from(table) 데이터를 조회할 테이블설정
  // .select(* | string[] | string) 조회할 컬럼 정보 (* 모든 컬럼)
  // .is(column, value) 조회 조건 where deleted_at = null
  // .order(column, { ascending: bool }) : 정렬 ascending false이면 내림차순
  const result = await supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null) // deleted_at이 null인 놈만 가져온다.
    .order("id", { ascending: false }); // id를 기준으로 내림차순
  return result;
};

// todoList 가져오기 by id
export const getTodosById = async (id: number) => {
  const supabase = createSupabaseBrowerClient();
  const result = await supabase
    .from("todos_no_rls") // todos_no_rls 테이블을 통해서 처리함.
    .select("*") // 모든 컬럼
    .is("deleted_at", null) // deleted_at이 null이거나
    .eq("id", id); // id가 일치하는 아이템 "id" == id

  return result;
};

// todoList 가져오기 by search keyword
// like => 대소문자 구별
// ilike => 대소문자 미구별
export const getTodosBySearch = async (search: string) => {
  const supabase = createSupabaseBrowerClient();
  const result = await supabase
    .from("todos_no_rls")
    .select("*") // 모든 컬럼 정보를 조회한다.
    .is("deleted_at", null)
    .like("content", `%${search}%`) // like검색 %search% => 문자열 템플릿 사용하여 like검색 적용
    .order("id", { ascending: false }); // 내림차순 정렬
  return result;
};

// createTodos
export const createTodos = async (content: string) => {
  const supabase = createSupabaseBrowerClient();
  const result = await supabase
    .from("todos_no_rls") // 테이블 가져오고
    .insert({
      // 데이터 추가
      content,
    })
    .select(); // 추가한 데이터 가져오기.
  return result;
};

// updateTodos
// id와 content를 입력받아서 값을 변경한다.
// content는 사용자가 입력받은 데이터, updated_at는 new Date().toISOString()으로 현재시간을 가지고 처리함. => 그리니치 표준 시간대 기준
export const updateTodos = async (id: number, content: string) => {
  const supabase = createSupabaseBrowerClient();
  const result = await supabase
    .from("todos_no_rls") // 테이블
    .update({ content, updated_at: new Date().toISOString() }) // 변경할 데이터 object로 전달
    .eq("id", id) // id가 일치하는 데이터를 변경해야하므로
    .select();
  return result;
};

// softDeleteTodos
// Todos를 Soft Delete하는 기능을 구현한다. => 테이블의 데이터를 삭제하지 않고 플래그값을 설정하도록...
// delete를 사용하지 말고 update를 사용하되 deleted_at에 값을 추가하는 방식을 사용함.
export const softDeleteTodos = async (id: number) => {
  const supabase = createSupabaseBrowerClient();
  const result = await supabase
    .from("todos_no_rls")
    .update({ deleted_at: new Date().toISOString() }) // deleted_at값을 추가하여 Soft Delete하도록 구성
    .eq("id", id) // id가 일치하는 데이터를 찾아서 값을 변경한다.
    .select();
  return result;
};

// hardDeleteTodos
// Todos 리스트에 데이터를 실제로 삭제함 => 소프트 삭제(논리적 삭제)와 다르게 테이블의 데이터를 삭제한다.
export const hardDeleteTodos = async (id: number) => {
  const supabase = createSupabaseBrowerClient();
  // 테이블에 id가 일치하는 데이터를 삭제한다.
  const result = supabase.from("todos_no_rls").delete().eq("id", id).select();
  return result;
};
