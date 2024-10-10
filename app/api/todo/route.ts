import { NextRequest, NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/server/supabase";
import { getTodoList } from "@/actions/todos/todos.actions";

// export const GET = async (req: NextRequest, res: NextResponse) => {
//   const supabase = await createServerSideClient();
//   const { data, error } = await supabase.from("todos_no_rls").select("*");
//   // todo 목록 조회
//   return NextResponse.json({ data, error });
// };

export const GET = async (req: NextRequest) => {
  const data = await getTodoList(); // 서버에서도 ServerAction 함수 호출 가능하다.
  return NextResponse.json({ ...data });
};
