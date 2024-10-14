import React from "react";
import TodoContainer from "./components/TodoContainer";
import { getUserInfo } from "@/actions/user/user.actions";
/**
 * insert => 로그인 필요
 * update, delete => 모두 user_id가 필요해보임
 *
 */
const page = async () => {
  // 서버렌더링 장점 : DB직접접근, Data Fetch가능
  const { user, error } = await getUserInfo();

  const fullName = user?.user_metadata.full_name;
  return (
    <div>
      <TodoContainer ownerUserId={user?.id} sharedUserFullName={fullName} />
    </div>
  ); // 5초 후에 실행함.
};

export default page;
