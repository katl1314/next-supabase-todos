import { NextRequest, NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/server/supabase";
export const GET = async (request: NextRequest) => {
  // request.url => http://localhost:3000/auth/callback?next=/auth&code="...."
  const { searchParams, origin } = new URL(request.url); // searchParams code or next

  const next = searchParams.get("next");
  const code = searchParams.get("code");

  console.log(" ========== /auth/callback console start ==========");
  console.log(`next         : ${next}`);
  console.log(`code         : ${code}`);
  console.log(`origin       : ${origin}`);
  console.log("========== /auth/callback console end ==========");

  if (code) {
    const supabase = createServerSideClient(); // 서버 클라이언트는 async로 구성됨
    const { error } = await supabase.auth.exchangeCodeForSession(code); // authToken을 교환해주는 함수 PKCE FLOW

    if (error) {
      // 원래 요청 경로로 떨군다.
      return NextResponse.redirect(origin); // http://localhost:3000
    }

    // 정상적으로 처리되었으면 원래 요청 경로로 이동한다.
    return NextResponse.redirect(`${origin}${next}`); // http://localhost:3000/auth
  }

  // code가 없으면 원래 요청 origin으로 떨군다.
  return NextResponse.redirect(origin); // http://localhost:3000
};
