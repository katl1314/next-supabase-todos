// 클라이언트용 Next.js에 요청하는 브라우저에서 Supabase API를 호출할 수 있다.
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { Database } from "@/database.types";

// supabase에 요청하는 클라이언트는 크롬 브라우저가 된다.
export const createSupabaseBrowerClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
