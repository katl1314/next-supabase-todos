"use client";
import React, { useState } from "react";
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
  isReadonly?: boolean;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
  onSearch: (content: string) => void;
}
const TodoList: React.FC<TodoListProps> = ({
  sharedUserFullName,
  ownerUserId,
  loading = false,
  todos = [],
  isReadonly = false,
  onUpdate,
  onDelete,
  onCreate,
  onSearch,
}) => {
  const [_, copy] = useCopyToClipboard(); // 공유 링크 복사
  const [searchText, setSearchText] = useState(""); // 검색어 상태
  // share 버튼 클릭 시 공유 링크 복사
  const handleShareClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const sharedLink = `${window.location.origin}/share/${ownerUserId}`;
    copy(sharedLink)
      .then(() => {
        // Toast 띄우기.
        alert(`공유 링크가 복사되었습니다.\n${sharedLink}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {!isReadonly && (
          <article className="flex flex-col sm:flex-row gap-4 mt-8 items-center">
            <div className=" flex flex-1 h-[60px]">
              {/* flex-1속성은 container에 얼마나 차지할지 비율임. 테두리 색상은 검정색, 테두리는 둥글게, 폰트는 두껍게 */}
              <input
                type="text"
                className="p-4 flex-1 bg-[#e7cb66] border border-black rounded-l-2xl font-bold"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Enter키 입력시 입력한 데이터를 검색한다.
                    onSearch(searchText);
                  }
                }}
              />
              {/* rounded-r-2xl 오른쪽 둥근 모서리 */}
              <div
                className="w-[60px] bg-[#000] flex items-center justify-center rounded-r-2xl cursor-pointer"
                onClick={() => onSearch(searchText)}
              >
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
            cursor-pointer
          "
              onClick={onCreate}
            >
              New Task
            </div>
          </article>
        )}

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
                  isReadonly={isReadonly}
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
