"use server"; // Server Action을 사용하여 사용자 정보 가져오기

import { createServerSideClient } from "@/lib/server/supabase";
export const getUserInfo = async () => {
  const supabase = createServerSideClient();

  // getSession을 사용하는것이 더 빠르다 => 메모리에서 가져오기 때문임. 하지만 서버에서 안전하지 않다.
  // getUser는 조회해서 가져오기 때문임. 다만 서버에서 안전하기 때문에 사용하는것이 좋다.
  //   const { data, error } = await supabase.auth.getSession();
  //   if (error) {
  //     return { error: error.message };
  //   }
  //   if (!data.session) {
  //     return { error: "세션이 없습니다." };
  //   }
  //   const { user } = data.session;
  //   return { user };

  // Supabase에서 사용자 인증 시 getUser를 사용하는것을 권장함. (보안적으로 유리한듯.)
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { error: error.message };
  }

  return { user: data.user };
};
