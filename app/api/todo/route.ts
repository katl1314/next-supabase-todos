import { NextRequest, NextResponse } from "next/server";
import { getTodoList } from "@/actions/todos/todos.actions";

// export const GET = async (req: NextRequest, res: NextResponse) => {
//   const supabase = createServerSideClient();
//   const { data, error } = await supabase.from("todos_no_rls").is("deleted_at", null).select("*");
//   // todo 목록 조회
//   return NextResponse.json({ data, error });
// };

export const GET = (req: NextRequest) => {
  // ServerAction 함수를 호출한다.
  const data = getTodoList(); // 서버에서도 ServerAction 함수 호출 가능하다.
  return NextResponse.json({ ...data });
};
