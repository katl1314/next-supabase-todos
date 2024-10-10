"use server"; // serverAction 함수 선언시 반드시 추가해야함.

export const ping = async () => {
  // 서버에서 실행하는 ServerAction 함수 ServerAction은 클라이언트 컴포넌트, 서버 컴포넌트 둘다 호출 가능
  console.log("서버에서 실행하는 ServerAction");
  return { message: "pong" };
};
