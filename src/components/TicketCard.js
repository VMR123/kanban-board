import React from "react";
import Backlog from "../assets/icons_FEtask/Backlog.svg";
import Cancelled from "../assets/icons_FEtask/Cancelled.svg";
import Done from "../assets/icons_FEtask/Done.svg";
import InProgress from "../assets/icons_FEtask/in-progress.svg";
import ToDo from "../assets/icons_FEtask/To-do.svg";
import ImgHighPriority from "../assets/icons_FEtask/Img - High Priority.svg";
import ImgMediumPriority from "../assets/icons_FEtask/Img - Medium Priority.svg";
import ImgLowPriority from "../assets/icons_FEtask/Img - Low Priority.svg";
import NoPriority from "../assets/icons_FEtask/No-priority.svg";
import UrgentPriority from "../assets/icons_FEtask/SVG - Urgent Priority grey.svg";

const TicketCard = ({ ticket, users, groupBy }) => {
  const statusIcons = {
    Backlog: Backlog,
    Cancelled: Cancelled,
    Done: Done,
    "In progress": InProgress,
    "Todo": ToDo,
  };

  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };

  const priorityIcons = {
    4: UrgentPriority,
    3: ImgHighPriority,
    2: ImgMediumPriority,
    1: ImgLowPriority,
    0: NoPriority,
  };

  // Get the user's name based on the userId
  const user = users.find((u) => u.id === ticket.userId);
  const userName = user ? user.name : "Unknown User";

  return (
    <div className="ticket-card">
      {/* Top Section */}
      <div className="ticket-card-top">
        <span className="ticket-id">{ticket.id}</span>
        {groupBy !== "user" && <span className="user-name">{userName}</span>}
      </div>

      {/* Middle Section */}
      <div className="ticket-card-middle">
        {groupBy !== "status" && (
          <div className="status-icon">
            <img src={statusIcons[ticket.status]} alt="status-icon" />
          </div>
        )}
        <h4 className="ticket-title">{ticket.title}</h4>
      </div>

      {/* Bottom Section */}
      <div className="ticket-card-bottom">
        {groupBy !== "priority" && (
          <div className="priority-section">
            <img
              src={priorityIcons[ticket.priority]}
              alt={`Priority ${ticket.priority}`}
            />
            {/* <span className="priority-label">{priorityLabels[ticket.priority]}</span> */}
          </div>
        )}
        <div className="tags">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
