"use client";
import React, { useState, useEffect, useCallback } from "react";
import { createSupabaseBrowerClient } from "@/lib/client/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useHydrate from "@/hooks/useHydrate";

const AuthUI = () => {
  const [user, setUser] = useState<any>(); // 사용자 정보 저장
  const supabase = createSupabaseBrowerClient(); // 슈파베이스 사용시 반드시 client필요
  const { mounted } = useHydrate(); // hydration여부 확인

  // 사용자 정보 가져오기 => useCallback을 사용하여 함수 재사용
  const getUserInfo = useCallback(async () => {
    // db에 접근시 client.from으로 접근했지만, 인증정보는 auth로 접근해.
    const { data, error } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
    }
  }, [supabase]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut(); // 로그아웃
      window.location.reload(); // 새로고침
    } catch (err: unknown) {
      // typescript에서 catch의 인자의 타입은 unknown이다. 그래서 instanceof를 통해 체크 필요함.
      if (err instanceof TypeError) {
        // TypeError
        console.error(err?.message);
      } else if (err instanceof SyntaxError) {
        // SyntaxError
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (!mounted) return; // hydration이전에는 표시하지 않는다.
  // 로그아웃 시 http://localhost:3000의 쿠키의 sb로 prefix붙은 키 2개를 삭제하면됨.
  return (
    <section className="w-full flex flex-row justify-center p-10">
      <div>{user ? `로그인 됨 ${user?.email}` : "로그아웃됨"}</div>
      <>
        {user && (
          <button className="border border-2" onClick={handleSignOut}>
            로그아웃
          </button>
        )}
      </>
      <div className="min-w-[500px] ">
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};

export default AuthUI;
