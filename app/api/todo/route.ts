import { NextRequest, NextResponse } from "next/server";
import { getTodos } from "@/actions/todos/todos.actions";

export const GET = (req: NextRequest) => {
  // ServerAction 함수를 호출한다.
  const data = getTodos(); // 서버에서도 ServerAction 함수 호출 가능하다.
  return NextResponse.json({ ...data });
};
