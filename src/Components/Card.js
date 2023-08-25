import React from "react";

export default function Card({ task, user }) {
  // console.log(user);
  function getFirstChars(inputText) {
    const words = inputText.split(" ");
    const firstChars = words.map((word) => word.charAt(0).toUpperCase());
    const result = firstChars.join("");
    return result;
  }
  return (
    <div className="task-card">
      <div className="task-card__header">
        <div className="task-id">{task.id}</div>
        <div className="circular-icon__name">
          {getFirstChars(user.name)}
          <div
            className={`circular-icon__name--${
              user.available ? "available" : "unavailable"
            }`}
          ></div>
        </div>
      </div>
      <div className="task-title">{task.title}</div>
      {task.tag.map((tag, index) => {
        return (
          <div className="task-tag" key={index}>
            <div className="circular-icon__tag"> </div>
            {tag}
          </div>
        );
      })}
    </div>
  );
}
