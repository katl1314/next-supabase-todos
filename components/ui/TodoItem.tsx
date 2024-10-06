import { Database } from "@/database.types";
import React from "react";

type ITodos = Database["public"]["Tables"]["todos_no_rls"]["Row"];

// React.FC<Type>을 적용하면 함수 인자에 타입을 일일히 적용할 필요가 없다.
const TodoItem: React.FC<ITodos> = ({
  id,
  content,
  created_at,
  deleted_at,
  updated_at,
}) => {
  return <li>{content}</li>;
};

export default TodoItem;
