// serverAction 함수 선언시 반드시 추가해야함.
"use server";

import { createServerSideClient } from "@/lib/server/supabase";

export const getTodoList = () => {
  console.log("서버에서 액션을 실행한다.");
  const supabase = createServerSideClient(); // supbase serverClient를 사용한다.
  return supabase
    .from("todos_no_rls")
    .select("*")
    .is("deleted_at", null) // deleted_at이 null인 데이터만 조회
    .order("id", { ascending: false }); // 내림차순 정렬
};
