// Server Action
"use server";
import { createServerSideClient } from "@/lib/server/supabase";

const TABLE_NAME = "todos_with_rls";
// todoList를 서버에서 요청 후 클라이언트에 전달한다.
export const getTodos = async () => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.
  const result = await supabase
    .from(TABLE_NAME) // 테이블 선택
    .select("*") // 모든 컬럼 가져오기
    .is("deleted_at", null) // deleted_at이 null인 데이터만 가져옴
    .order("id", { ascending: false }); // id를 기준으로 내림차순 정렬

  return result;
};

// 특정 id를 가진 todolist를 서버에서 요청 후 클라이언트에 전달한다.
export const getTodosById = async (id: number) => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.

  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id) // id가 일치하는 데이터만 가져옴
    .is("deleted_at", null) // deleted_at이 null인 데이터만 가져옴
    .order("id", { ascending: false }); // id를 기준으로 내림차순 정렬
};

// content를 포함하는 todolist를 서버에서 요청 후 클라이언트에 전달
export const getTodosBySearch = async (search: string) => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.
  const result = await supabase
    .from(TABLE_NAME)
    .select("*")
    .is("deleted_at", null)
    .ilike("content", `%${search}%`)
    .order("id", { ascending: false }); // 대소문자 미구별한 상태서 like검색
  return result;
};

// 새로운 Todolist 생성 => 2024.10.13 확인결과 RLS 적용됨.
export const createTodos = async (content: string) => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.
  const result = await supabase
    .from(TABLE_NAME)
    .insert({
      content,
    })
    .select();
  console.log(result);
  return result;
};

// 특정 id를 가진 todolist를 업데이트
export const updateTodos = async (id: number, content: string) => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.

  return await supabase
    .from(TABLE_NAME)
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id) // id가 일치하는 데이터만 업뎃
    .select();
};

// 특정 id를 가진 todoList 삭제 => 소프트 삭제
export const softDeleteTodos = async (id: number) => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.
  return await supabase
    .from(TABLE_NAME)
    .update({
      id,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();
};

// id와 user_id가 일치하는 데이터 조회
export const getTodoByUserId = async (userId: string) => {
  const supabase = createServerSideClient(); // 사용자 인증정보를 쿠키에서 가지고 있다. => 쿠키를 허용해야함.
  const { data, error } = await supabase
    .from("todos_with_rls")
    .select("*")
    .is("deleted_at", null) // deleted_at가 null인 놈
    .eq("user_id", userId) // 테이블의 user_id컬럼이 일치하는 놈
    .order("id", { ascending: false });

  return data;
};
