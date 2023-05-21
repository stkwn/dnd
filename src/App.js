import { useState } from "react";
import initialData from "./data.js";
import Header from "./Components/Header.js";
import Column from "./Components/Column.js";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [state, setState] = useState(initialData);

  const onDragStart = () => {
    document.body.style.color = "#432111";
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
  };

  const onDragEnd = (result) => {
    // const result = {
    //   draggableId: "task-1",
    //   type: "TYPE",
    //   reason: "DROP",
    //   source: {
    //     droppableId: "column-1",
    //     index: 0,
    //   },
    //   destination: {
    //     droppableId: "column-1",
    //     index: 1,
    //   },
    // };
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    const { destination, source, draggableId } = result;
    if (!destination) return; // if destination is null, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } //if nothing changed, return
    const start = state.columns[source.droppableId]; // create a new column
    const finish = state.columns[destination.droppableId]; // create a new column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds); // create a new taskIds array
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
    const startTaskIds = Array.from(start.taskIds); // create a new taskIds array
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds); // create a new taskIds array
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    return;
  };

  return (
    <div>
      <div className="container-fluit shadow-sm">
        <Header />
      </div>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <div className="container mt-3">
          <div className="row">
            {state.columnOrder.map((columnId) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
