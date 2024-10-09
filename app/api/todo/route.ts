import { NextRequest, NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/server/supabase";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase.from("todos_no_rls").select("*");
  // todo 목록 조회
  return NextResponse.json({ data, error });
};
