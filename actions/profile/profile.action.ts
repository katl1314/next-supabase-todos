"use server";

import { createServerSideClient } from "@/lib/server/supabase";

export const getUserProfile = async (user_id: string) => {
  const supabase = createServerSideClient();

  // public.profiles 테이블에 user_id가 있는지 검사
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id);

  return data;
};
