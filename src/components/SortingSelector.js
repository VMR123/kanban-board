import React from "react";

function SortingSelector({ sorting, setSorting }) {
  const sortingOptions = ["Priority", "Title"];

  return (
    <div className="sorting-selector">
      <label htmlFor="sorting">Sort By:</label>
      <select
        id="sorting"
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
      >
        {sortingOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortingSelector;
