"use server";

import { createServerSideClient } from "@/lib/server/supabase";

export const getUserProfile = async (
  user_id: string,
  serverComponent: boolean = true
) => {
  const supabase = createServerSideClient(serverComponent);

  // public.profiles 테이블에 user_id가 있는지 검사
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id); // profiles의 id가 user_id와 일치하는 데이터를 가져오자.

  return data;
};
