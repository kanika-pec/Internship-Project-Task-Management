import React from "react";
import {hot} from "react-hot-loader";
// import "./App.css";
import FilterTask from "./components/FilterTask";
import AddNewTask from "./components/AddNewTask";
import TaskDisplay from "./components/TaskDisplay";

export default function App() {
    const [taskList, setTaskList] = React.useState([])
    return(
        <>
        <FilterTask taskList={taskList} setTaskList={setTaskList}/>
        <AddNewTask taskList={taskList} setTaskList={setTaskList} />
        <TaskDisplay taskList={taskList} setTaskList={setTaskList}/>
    </>
  )
}

