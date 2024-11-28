import React from "react";

function GroupingSelector({ grouping, setGrouping }) {
  const groupingOptions = ["By Status", "By User", "By Priority"];

  return (
    <div className="grouping-selector">
      <label htmlFor="grouping">Group By:</label>
      <select
        id="grouping"
        value={grouping}
        onChange={(e) => setGrouping(e.target.value)}
      >
        {groupingOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GroupingSelector;
