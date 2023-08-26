import React, { useEffect, useState } from "react";
import { fetchTasks } from "../store/tasks";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import DropDown from "../Components/DropDown";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Tasks() {
  const dispatch = useDispatch();
  // const grouping = localStorage.getItem("grouping") || "status";
  // const ordering = localStorage.getItem("ordering") || "priority";
  const [grouping, setgrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [ordering, setordering] = useState(
    localStorage.getItem("ordering", "priority")
  );
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const { tasks } = useSelector((state) => state.taskStore);
  const statuses = ["Todo", "In progress", "Backlog", "Done", "Canceled"];
  const priorities = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };
  const USER_OPTIONS = {
    "usr-1": "Anoop sharma",
    "usr-2": "Yogesh",
    "usr-3": "Shankar Kumar",
    "usr-4": "Ramesh",
    "usr-5": "Suresh",
  };

  const groupedTasks = {};

  if (grouping === "status") {
    statuses.forEach((status) => {
      groupedTasks[status] = tasks.tickets.filter(
        (task) => task.status === status
      );
    });
  } else if (grouping === "priority") {
    Object.keys(priorities).forEach((priority) => {
      groupedTasks[priorities[priority]] = tasks.tickets.filter(
        (task) => task.priority === parseInt(priority)
      );
    });
  } else if (grouping === "user") {
    Object.keys(USER_OPTIONS).forEach((user) => {
      groupedTasks[USER_OPTIONS[user]] = tasks.tickets.filter(
        (task) => task.userId === user
      );
    });
  }

  const sortedTasks = Object.keys(groupedTasks).reduce((sorted, group) => {
    sorted[group] = groupedTasks[group].sort((a, b) => {
      if (ordering === "priority") {
        return b.priority - a.priority;
      } else if (ordering === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    return sorted;
  }, {});

  // console.log(sortedTasks);

  return (
    <div className="tasks-page">
      <div className="header">
        <DropDown
          grouping={grouping}
          ordering={ordering}
          setgrouping={setgrouping}
          setordering={setordering}
        />
      </div>
      <div className="tasks-page__body">
        {Object.keys(sortedTasks).map((group, index) => (
          <div key={index} className="Section">
            <div className="SectionHeader">
              <span>
                <span className="section__group-name">{group}</span>
                <span>{sortedTasks[group].length}</span>
              </span>
              <span>
                <button className="icon-btn">
                  <AddIcon />
                </button>
                <button className="icon-btn">
                  <MoreHorizIcon />
                </button>
              </span>
            </div>
            <div className="CardContainer">
              {sortedTasks[group].map((task) => (
                <Card
                  task={task}
                  key={task.id}
                  user={tasks.users.find((user) => user.id === task.userId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
