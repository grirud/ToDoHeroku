import { useState } from "react";
import "./InputAddToDo.css";

export const InputAddToDo = ({ createTodo }) => {
  const [value, setTodo] = useState("");

  return (
    <div className="flex">
      <form 
        onSubmit={(e) => {
          createTodo(e, value);
          setTodo("");
        }}
      >
        <input
          placeholder="What needs to be Done?"
          value={value}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
        />
      </form>
    </div>
  );
};
