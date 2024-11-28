import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import { fetchData } from "./services/api";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => localStorage.getItem("groupBy") || "status");
  const [sortBy, setSortBy] = useState(() => localStorage.getItem("sortBy") || "priority");

  const priorityLevels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
  };

  const possibleStatuses = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

  useEffect(() => {
    const getData = async () => {
      try {
        const { tickets, users } = await fetchData();
        setTickets(tickets);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  // Persist groupBy and sortBy state to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
  }, [sortBy]);

  const groupTickets = () => {
    const grouped = {};

    // Initialize empty arrays for each group based on the grouping criteria
    if (groupBy === "status") {
      possibleStatuses.forEach((status) => {
        grouped[status] = [];
      });
    } else if (groupBy === "priority") {
      Object.values(priorityLevels).forEach((level) => {
        grouped[level] = [];
      });
    }

    // Group tickets by the selected criteria (status, user, priority)
    tickets.forEach((ticket) => {
      let key;
      if (groupBy === "status") {
        key = ticket.status;
      } else if (groupBy === "user") {
        const user = users.find((u) => u.id === ticket.userId);
        key = user ? user.name : "Unknown User";
      } else if (groupBy === "priority") {
        key = priorityLevels[ticket.priority] || "No Priority";
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    // Sort tickets within each group based on the selected `sortBy` value
    Object.keys(grouped).forEach((group) => {
      grouped[group].sort((a, b) => {
        if (sortBy === "priority") {
          // Sort by priority (high to low)
          return b.priority - a.priority;
        } else if (sortBy === "title") {
          // Sort by title alphabetically
          return a.title.localeCompare(b.title);
        }
        return 0; // No sorting by default
      });
    });

    return grouped;
  };

  const groupedTickets = useMemo(() => groupTickets(), [tickets, users, groupBy, sortBy]);

  return (
    <div className="app">
      <Header
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <KanbanBoard groupedTickets={groupedTickets} users={users} groupBy={groupBy} sorting={sortBy} />
    </div>
  );
};

export default App;
