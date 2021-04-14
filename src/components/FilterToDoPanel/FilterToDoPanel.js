import "./FilterToDoPanel.css";

export const FilterToDoPanel = ({
  handleChangeFilter,
  handleClickDelCompl,
  count
}) => {
  return (
    <div className="buttonPanel">
      <span>{count} items left</span>
      <div>
        <button
          onClick={() => handleChangeFilter("All")}
        >
          All ToDo
        </button>
        <button
          onClick={() => handleChangeFilter('Done')}
        >
          Done ToDo
        </button>
        <button
          onClick={() => handleChangeFilter('Active')}
        >
          Active ToDo
        </button>
      </div>
      <button className="buttonDel" onClick={handleClickDelCompl}>
        Clear completed
      </button>
    </div>
  );
};
