"use client";
import React from "react";
import { IoShareSocialOutline, IoSearchOutline } from "react-icons/io5"; // 공유 아이콘
import { useCopyToClipboard } from "usehooks-ts";
import { Database } from "@/database.types";
import TodoItem from "./TodoItem";

type ITodos = Database["public"]["Tables"]["todos_no_rls"]["Row"];

interface TodoListProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
  loading?: boolean;
  todos: ITodos[];
}
const TodoList: React.FC<TodoListProps> = ({
  sharedUserFullName,
  ownerUserId,
  loading = false,
  todos = [],
}) => {
  const [copiedText, copy] = useCopyToClipboard();
  // share 버튼 클릭 시 공유 링크 복사
  const handleShareClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const sharedLink = `${window.location.origin}/shared/${ownerUserId}`;
    copy(sharedLink)
      .then(() => {
        // console.log("copied", { text: sharedLink });
        // Toast 띄우기.
        alert("공유 링크가 복사되었습니다.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 아이템 삭제
  const onDelete = (id: number) => {};

  // 아이템 수정
  const onUpdate = (id: number) => {};

  // tailwind css 사용 min-height 70vh background: #69CFCF
  return (
    <section className="min-h-[70vh] bg-[#69CFCF]">
      {/* margin:auto margin 중앙정렬 후 패딩 20px 최대 너비 800px */}
      <div className="w-[100%] max-w-[800px] m-[auto] p-[20px] ">
        <article className="flex justify-between items-center">
          <div className="text-[32px] font-bold">
            Things to do:{" "}
            {sharedUserFullName && <div>{sharedUserFullName}</div>}
          </div>
          {/* ownerUserId가 있을 때만 공유 버튼 보이기 */}
          {ownerUserId && (
            <div
              className="font-bold text-[20px] flex flex-row items-center gap-4 cursor-pointer"
              onClick={handleShareClick}
            >
              Share
              <IoShareSocialOutline size={20} />
            </div>
          )}
        </article>
        {/* Search */}
        <article className="flex flex-col sm:flex-row gap-4 mt-8 items-center">
          <div className=" flex flex-1 h-[60px]">
            {/* flex-1속성은 container에 얼마나 차지할지 비율임. 테두리 색상은 검정색, 테두리는 둥글게, 폰트는 두껍게 */}
            <input
              type="text"
              className="p-4 flex-1 bg-[#e7cb66] border-black rounded-2xl font-bold"
            />
            {/* rounded-r-2xl 오른쪽 둥근 모서리 */}
            <div className="w-[60px] bg-[#000] flex items-center justify-center rounded-r-2xl cursor-pointer">
              <IoSearchOutline size={40} color="white" />
            </div>
          </div>
          {/* 버튼 생성 */}
          <div
            className="
            w-[200px]
            h-[60px]
            flex justify-center items-center
            bg-[#7ebb95] border border-black rounded-xl
          "
          >
            New Task
          </div>
        </article>
        {/* 중간 선 표시 */}
        <div className="h-[2px] my-10 bg-black"></div>
        {/* Todos 리스트 표시 */}
        {todos.length > 0 ? (
          // TODO ITEM
          <ul className="flex flex-col gap-6">
            {todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  {...todo}
                />
              );
            })}
          </ul>
        ) : (
          <div>{loading ? "Todos is loading..." : "Todos is Emptry..."} </div>
        )}
      </div>
    </section>
  );
};

export default TodoList;
