import React from "react";
import TodoContainer from "./components/TodoContainer";
import { getUserProfile } from "@/actions/profile/profile.action";
import { permanentRedirect } from "next/navigation";
/**
 * insert => 로그인 필요
 * update, delete => 모두 user_id가 필요해보임
 */

interface ISharePageProps {
  params: { user_id: string };
  searchParams: any;
}

// SSR의 컴포넌트 렌더링 시 함수 인자에는 params, searchParams가 포함된 객체가 있다.
// searchParams 쿼리 스트링 파라미터 ex) ?search=111
// parasm 라우팅 파라미터

const page: React.FC<ISharePageProps> = async ({ params }) => {
  // 서버렌더링 장점 : DB직접접근, Data Fetch가능
  const { user_id } = params; // 동적 라우팅 파라미터
  console.log(user_id);

  const profile = await getUserProfile(user_id);

  if (!profile) {
    // 만약 userProfile이 없으면? 404페이지를 반환
    console.log("Profile 정보가 없습니다.");
    permanentRedirect("/"); // Home으로 영구 리다이렉트
  }

  const fullName = (profile.full_name as string) ?? "";

  return (
    <div>
      <TodoContainer sharedUserFullName={fullName} ownerUserId={user_id} />
    </div>
  );
};

export default page;

// user_id가 supabase auth스키마 내 users 테이블에 존재하는지 확인 필요
// 하지만 supabase는 auth스키마 내 테이블을 조회하지 않는다.
// 예를들어 browserClient를 통해 API auth.users 조회하는것을 보안문제로 제공하지 않는다.
// 대첵 auth 스키마의 users테이블을 public/profiles 테이블로 복사 붙여넣기 하는 방법

// 이전 todos_with_rls 테이블에 foreignkey로 auth id를 설정했는데 remove시 no action을 설정하여 auth삭제시 에러가 발생함.
// 그래서 no action -> set null으로 변경
