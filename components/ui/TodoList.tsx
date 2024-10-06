"use client";
import React from "react";
import { IoShareSocialOutline } from "react-icons/io5"; // 공유 아이콘
import { useCopyToClipboard } from "usehooks-ts";

interface TodoListProps {
  sharedUserFullName?: string;
  ownerUserId?: string;
}
const TodoList: React.FC<TodoListProps> = ({
  sharedUserFullName,
  ownerUserId,
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
      </div>
    </section>
  );
};

export default TodoList;
