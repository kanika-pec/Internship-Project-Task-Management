import React from "react";
import TaskContext from "../TaskContext";

export default function AddNewTask(){

    const [task, setTask] = React.useState({taskname: "", status: "", assignee: ""})

    const column = {
        "To Do" : 1, 
        "In Progress" : 2, 
        "Complete" : 3
    }
    
    function handleSubmit(event, taskList, setTaskList) {
        event.preventDefault();
        const newTask = {id: taskList.length, taskname: task.taskname, col: column[task.status], show: true, assignee: task.assignee}
        setTaskList(prevTaskList => {     
            return [...prevTaskList, newTask]
        })
        setTask({taskname: "", status: "", assignee: ""})
    }

    function handleChange(event){
        const {name, value} = event.target
        setTask(prevTask => {
            return {
                ...prevTask, [name]: value
            }
        })
    }
    
    function addTask(value) {
        return (
            <form className="add-new-task" onSubmit={(e) => handleSubmit(e, value.taskList, value.setTaskList)}>
                <input type="input" placeholder="Task Name" name="taskname" value={task.taskname} onChange={handleChange}></input>
                <input type="input" placeholder="Add Assignee" name="assignee" value={task.assignee} onChange={handleChange}></input>
                <select className="task-status" name="status" value={task.status} onChange={handleChange} data-testid='select' >
                    <option value="" style={{display: "none"}}>Select Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                </select>
                <button>Add Task</button>
            </form>
        )
    }
    
    return (
        <TaskContext.Consumer >
            {(value) => addTask(value)}
        </TaskContext.Consumer>
    )
}