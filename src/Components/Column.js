import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task.js";

export default function Column({ column, tasks }) {
  return (
    <div className="col shadow-sm">
      <div className="container">
        <div className="card my-3 bg-primary text-white">
          <h3>{column.title.toUpperCase()}</h3>
        </div>
        <Droppable
          droppableId={column.id}
          type={column.id === "column-3" ? "done" : "active"}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`card p-3 ${
                snapshot.isDraggingOver ? "bg-secondary" : "bg-light"
              }`}
              style={{ transition: "background 0.5s ease" }}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
