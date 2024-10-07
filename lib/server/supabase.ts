import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/database.types";
import { cookies } from "next/headers";
import { type NextRequest, type NextResponse } from "next/server";
import {
  getCookie,
  setCookie,
  deleteCookie,
  CookieValueTypes,
} from "cookies-next";

// supabase에 요청하는 클라이언트는 Next.js서버가 된다.
// ServerAction, RouterHandler는 RSC로 구현해야한다.
export const createServerSideClient = async (
  serverComponent: boolean = false
) => {
  const cookieStore = cookies(); // 쿠키 저장소 key, value로 저장/삭제/수정가능

  const get = (name: string) => {
    if (serverComponent) return;
    return cookieStore.get(name)?.value as string; // 쿠키 저장소에서 쿠키 가져오기
  };
  const set = (name: string, value: string, options: CookieOptions) => {
    if (serverComponent) return;
    cookieStore.set({ name, value, ...options }); // 쿠키 저장소에 쿠키 저장
  };
  const remove = (name: string, options: CookieOptions) => {
    if (serverComponent) return;
    cookieStore.delete(name); // 쿠키 저장소에 쿠키 삭제
  };

  return createSupabaseClient<string>(get, set, remove);
};

// -RSC
// 서버에서 사용하는 컴포넌트 => 리액트 서버 컴포넌트
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// Middleware
// 미들웨어에서 서버 클라이언트의 쿠키는 cookies-next를 사용해야한다.
// 미들웨어 함수는 options내 req, res를 전달한다.
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  const get = (name: string) => getCookie(name, { req, res }) as string;
  const set = (name: string, value: string, options: CookieOptions) =>
    setCookie(name, value, { req, res, ...options });
  const remove = (name: string, options: CookieOptions) =>
    deleteCookie(name, { req, res, ...options });

  return createSupabaseClient<string>(get, set, remove);
};

export const createSupabaseClient = <T>(
  get: (name: string) => CookieValueTypes,
  set: (name: string, value: string, options: CookieOptions) => void,
  remove: (name: string, options: CookieOptions) => void
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        // BrowserClient와 다르게 options.cookies받고 있다.
        // Supbase/ssr의 경우 remix, nuxt와 같은 다른 서버사이드와의 호환을 위해 추상화해야함.
        get,
        set,
        remove,
      },
    }
  );
};
