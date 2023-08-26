import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectGrouping, selectOrdering } from "../store/tasks";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function DropDown({
  grouping,
  ordering,
  setgrouping,
  setordering,
}) {
  const dispatch = useDispatch();
  // const [grouping, setgrouping] = useState("status");
  // const [ordering, setordering] = useState("priority");

  useEffect(() => {
    setgrouping(localStorage.getItem("grouping") || "status");
    setordering(localStorage.getItem("ordering") || "priority");
  }, []);

  function handleGroupingChange(e) {
    const newSelectedOption = e.target.value;
    // dispatch(selectGrouping(newSelectedOption));
    localStorage.setItem("grouping", newSelectedOption);
    setgrouping(newSelectedOption);
    // localStorage["grouping"] = e.target.value;
  }
  function handleOrderingChange(e) {
    // dispatch(selectOrdering(e.target.value));
    localStorage["ordering"] = e.target.value;
    setordering(e.target.value);
  }

  const [visiblility, setvisiblility] = useState("hidden");

  function toggleDropdown() {
    // console.log(visiblility);
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
          <select value={grouping}>
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
          <select value={ordering}>
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
