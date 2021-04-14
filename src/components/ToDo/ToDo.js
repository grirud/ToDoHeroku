import "./ToDo.css";

export const ToDo = ({ handleRemove, handleClickChangeStatus, todo }) => {
  return (
    <div className="toDoList">
      <span 
        onClick={(e) => handleClickChangeStatus(e, todo._id)}
        style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button onClick={() => handleRemove(todo._id)}>X</button>
    </div>
  );
};
