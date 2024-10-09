import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 쿠키카운터 상수
const COOKIE_COUNTER = "cookie-counter";
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const res = NextResponse.next(); // 미들웨어 함수 실행 후 Pass

  if (req.cookies.get(COOKIE_COUNTER)?.value) {
    // 쿠키 카운터에 대한 값이 undefined가 아니라면?
    let value = +(req.cookies.get(COOKIE_COUNTER)?.value ?? "0"); // 값이 문자열이므로 +를 사용하여 숫자로 변환
    res.cookies.set(COOKIE_COUNTER, (++value).toString()); // 이전 카운터에서 1증가 후 저장한다.
  } else {
    // 쿠키의 값은 문자열만...
    res.cookies.set(COOKIE_COUNTER, "1");
  }
  console.log("미들웨어 통과");
  return res; // origin을 기준으로 쿠키를 저장 (브라우저 꺼도 남아있음)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/:path*"], // "루트" 또는 /todos_no_rls 경로로 접근 시 미들웨어 실행
};
