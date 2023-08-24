import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { selectGrouping, selectOrdering } from "../store/tasks";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function DropDown() {
  //   const { grouping, ordering } = useSelector((state) => state.taskStore);
  const grouping = useRef(localStorage["grouping"] ?? "status");
  const ordering = useRef(localStorage["ordering"] ?? "priority");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage["grouping"]) {
      dispatch(selectGrouping(localStorage["grouping"]));
      grouping.current = localStorage["grouping"];
    } else {
      localStorage["grouping"] = "status";
      grouping.current = "status";
    }
    if (localStorage["ordering"]) {
      dispatch(selectOrdering(localStorage["ordering"]));
      ordering.current = localStorage["ordering"];
    } else {
      localStorage["ordering"] = "priority";
      ordering.current = "priority";
    }
  }, [grouping, ordering, dispatch]);

  function handleGroupingChange(e) {
    dispatch(selectGrouping(e.target.value));
    localStorage["grouping"] = e.target.value;
  }
  function handleOrderingChange(e) {
    dispatch(selectOrdering(e.target.value));
    localStorage["ordering"] = e.target.value;
  }

  const [visiblility, setvisiblility] = useState("hidden");

  function toggleDropdown() {
    console.log(visiblility);
    if (visiblility === "hidden") {
      setvisiblility("visible");
    } else {
      setvisiblility("hidden");
    }
  }

  return (
    <div>
      <button onClick={toggleDropdown} className="header-display-btn">
        <TuneIcon />
        <span className="display-btn">Display</span>
        <ArrowDropDownIcon />
      </button>
      <div className="top-dropdown" style={{ visibility: `${visiblility}` }}>
        <div
          className="DropDown"
          onChange={handleGroupingChange}
          value={grouping}
        >
          <label>Grouping</label>
          <select>
            <option value="status" className="options">
              Status
            </option>
            <option value="user" className="options">
              User
            </option>
            <option value="priority" className="options">
              Priority
            </option>
          </select>
        </div>
        <div
          className="DropDown"
          onChange={handleOrderingChange}
          value={ordering}
        >
          <label>Ordering</label>
          <select>
            <option value="priority" className="options">
              Priority
            </option>
            <option value="title" className="options">
              Title
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
