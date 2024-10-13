"use client";
import React from "react";
import { User } from "@supabase/supabase-js"; // User에 대한 타입 제공
import { createSupabaseBrowerClient } from "@/lib/client/supabase";
import { useRouter } from "next/navigation";
import { FcTodoList, FcGoogle } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";

interface AuthHeaderProps {
  user?: User | null;
}

// 로그인과 관련된 작업
const AuthHeader: React.FC<AuthHeaderProps> = ({ user }) => {
  const isLoggedIn = !!user === true && user.email;

  // 해당 컴포넌트는 클라이언트 컴포넌트이므로 supabase browserClient사용
  const supabase = createSupabaseBrowerClient();

  // router next/navigation 사용 (app router용)
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO, // 로그인 후 실행할 리다이렉트 URL
      },
    });
  };

  const handleLogout = async () => {
    // 로그아웃
    await supabase.auth.signOut();
    window.location.reload(); //새로고침
  };

  return (
    <header className="h-[50px] w-full bg-white">
      <section className="px-6 h-full">
        <div className="flex flex-row justify-between items-center h-full w-full">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={goToHome}
          >
            TODO <FcTodoList size={30} />
          </div>
          <div>
            {isLoggedIn ? (
              <div
                className="flex flex-row items-center gap-2 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
                <AiOutlineLogout size={30} />
              </div>
            ) : (
              <div
                className="flex flex-row gap-2 items-center cursor-pointer"
                onClick={handleLogin}
              >
                Login
                <FcGoogle size={30} />
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default AuthHeader;
