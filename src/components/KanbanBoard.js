import React from "react";
import TicketCard from "./TicketCard";

// Import icons
import AddIcon from "../assets/icons_FEtask/add.svg";
import MenuIcon from "../assets/icons_FEtask/3 dot menu.svg";

import Backlog from "../assets/icons_FEtask/Backlog.svg";
import Cancelled from "../assets/icons_FEtask/Cancelled.svg";
import Done from "../assets/icons_FEtask/Done.svg";
import InProgress from "../assets/icons_FEtask/in-progress.svg";
import ToDo from "../assets/icons_FEtask/To-do.svg";

import UrgentPriority from "../assets/icons_FEtask/SVG - Urgent Priority grey.svg";
import ImgHighPriority from "../assets/icons_FEtask/Img - High Priority.svg";
import ImgMediumPriority from "../assets/icons_FEtask/Img - Medium Priority.svg";
import ImgLowPriority from "../assets/icons_FEtask/Img - Low Priority.svg";
import NoPriority from "../assets/icons_FEtask/No-priority.svg";

const KanbanBoard = ({ groupedTickets, groupBy, users, sortBy }) => {
  const statusIcons = {
    Backlog: Backlog,
    Cancelled: Cancelled,
    Done: Done,
    "In progress": InProgress,
    Todo: ToDo,
  };

  const priorityIcons = {
    Urgent: UrgentPriority,
    High: ImgHighPriority,
    Medium: ImgMediumPriority,
    Low: ImgLowPriority,
    "No Priority": NoPriority,
  };

  const getIconForGroup = (group) => {
    if (groupBy === "status") {
      return statusIcons[group] || null;
    } else if (groupBy === "priority") {
      return priorityIcons[group] || null;
    }
    return null; // No icon for user grouping
  };

  // Sorting logic: sort tickets within each group based on the 'sortBy' value (priority or title)
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority; // Higher priority first
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title); // Alphabetical order
      }
      return 0; // No sorting by default
    });
  };

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <div key={group} className="kanban-group">
          {/* Column Header */}
          <h3 className="kanban-group-title">
            {/* Left Icon */}
            {getIconForGroup(group) && (
              <img
                src={getIconForGroup(group)}
                alt={`${group} icon`}
                className="kanban-group-icon"
              />
            )}
            {/* Label */}
            <span className="group-name">{group}</span>
            {/* Count */}
            <span className="group-length">&nbsp;&nbsp;{tickets.length}</span>
            {/* Right Icons */}
            <div className="group-actions">
              <img
                src={AddIcon}
                alt="Add icon"
                className="action-icon add-icon"
              />
              <img
                src={MenuIcon}
                alt="Menu icon"
                className="action-icon menu-icon"
              />
            </div>
          </h3>

          {/* Cards */}
          <div className="kanban-cards">
            {sortTickets(tickets).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
