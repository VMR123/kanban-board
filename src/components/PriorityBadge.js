// src/components/PriorityBadge.js
import React from "react";
import icons from "../assets/icons";

const PriorityBadge = ({ priority }) => {
  const priorityIcons = {
    high: "Img-High-Priority",
    medium: "Img-Medium-Priority",
    low: "Img-Low-Priority",
    none: "no-priority",
    urgent: "SVG-Urgent-Priority-colour",
  };

  return (
    <div className="priority-badge">
      <img src={icons[priorityIcons[priority]]} alt={`${priority} priority`} />
    </div>
  );
};

export default PriorityBadge;
