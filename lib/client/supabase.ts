// 클라이언트용 Next.js에 요청하는 브라우저에서 Supabase API를 호출할 수 있다.
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { Database } from "@/database.types";

export const createSupabaseBrowerClient = () =>
  // createBrowserClient<>(supabase_url, supabase_key)
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
