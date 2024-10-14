"use client";
import { Database } from "@/database.types";
import { useState, FC, ChangeEvent } from "react";
import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

type ITodos = Database["public"]["Tables"]["todos_no_rls"]["Row"];

interface ITodoItem extends ITodos {
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
  isReadonly: boolean;
}

// React.FC<Type>을 적용하면 함수 인자에 타입을 일일히 적용할 필요가 없다.
const TodoItem: FC<ITodoItem> = ({
  id,
  content,
  isReadonly,
  onDelete,
  onUpdate,
}) => {
  // min-height : 60px; <= 최소 높이
  // background-color: #6280d9
  // border
  // border-color: black
  // border-radius : 1rem 16px
  // group 해당 요소의 자식 요소를 감싼다. 예를 들어 li에 마우스 호버시 li의 특정 자식 요소에 스타일을 적용할 수 있음.
  const [isEdit, setIsEdit] = useState(false);
  const [userInput, setUserInput] = useState(content ?? ""); // 콘텐츠를 기본값으로 없으면 ""으로

  //  div를 클릭했을때 edit모드 활성화
  const onStartEdit = () => {
    if (isEdit) return; // 이미 편집중이면 활성화 하면 안됨.
    setIsEdit((prevState) => prevState === false && !prevState);
  };

  // 수정이 끝났을때?
  const onFinishEdit = () => {
    onUpdate(id, userInput);
    onStopEdit();
  };

  // 삭제 버튼 클릭했을 때
  const onClickDelete = () => {
    onDelete(id); // 상위 컴포넌트에 전달한다. 실제 처리하는 이벤트를 prop로 전달하는 방식
  };

  const onStopEdit = () => {
    setIsEdit((prevState) => prevState === true && !prevState);
  };

  // 사용자 입력에 값을 변경하는 이벤트 => setUserInput에 전달
  const onUserInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value)
    setUserInput(event.target.value);
  };

  return (
    <li className="min-h-[60px] bg-[#b280d9] border border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        {isEdit ? (
          <div className="flex flex-1 text-[18px] cursor-pointer p-2">
            <input type="text" value={userInput} onChange={onUserInputChange} />
          </div>
        ) : (
          <div className="flex-1 text-[18px] cursor-pointer">{content}</div>
        )}
        {!isReadonly && (
          <div className="w-fit hidden group-hover:flex self-end gap-4">
            {isEdit ? (
              <div
                onClick={onFinishEdit}
                className="w-[45px] h-[45px] flex justify-center items-center bg-[#7ebb95] border border-black rounded-2xl cursor-pointer"
              >
                <CiCircleCheck size={30} color="black" />
              </div>
            ) : (
              <div
                onClick={onStartEdit}
                className="w-[45px] h-[45px] flex justify-center items-center bg-[#7ebb95] border border-black rounded-2xl cursor-pointer"
              >
                <CiEdit size={30} color="black" />
              </div>
            )}
            <div
              onClick={onClickDelete}
              className="w-[45px] h-[45px] flex justify-center items-center bg-[#ec3636] border border-black rounded-2xl cursor-pointer"
            >
              <AiOutlineDelete size={30} color="black" />
            </div>
          </div>
        )}
      </article>
    </li>
  );
};

export default TodoItem;
