import React from "react";
import "./App.css";
import FilterTask from "./components/FilterTask";
import AddNewTask from "./components/AddNewTask";
import TaskDisplay from "./components/TaskDisplay";
import TaskContext from "./TaskContext";

export default function App() {
    const [taskList, setTaskList] = React.useState([])
    
    return(
        <TaskContext.Provider value={{taskList, setTaskList}}>
          <FilterTask taskList={taskList} setTaskList={setTaskList} />
          <AddNewTask />
          <TaskDisplay taskList={taskList} setTaskList={setTaskList} />
        </TaskContext.Provider>
  )
}

