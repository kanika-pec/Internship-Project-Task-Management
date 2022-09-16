import React from "react";

export default function AddNewTask({taskList, setTaskList}){

    const [task, setTask] = React.useState({taskname: "", status: "", assignee: "Person A"})

    const column = {
        "To Do" : 1, 
        "In Progress" : 2, 
        "Complete" : 3
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        const newTask = {id: taskList.length, taskname: task.taskname, col: column[task.status], show: true, assignee: task.assignee}
        setTaskList(prevTaskList => {     
            return [...prevTaskList, newTask]
        })
        setTask({taskname: "", status: "", assignee: "Person A"})
    }

    function handleChange(event){
        const {name, value} = event.target
        setTask(prevTask => {
            return {
                ...prevTask, [name]: value
            }
        })
    }
    
    return (
        <form className="add-new-task" onSubmit={handleSubmit}>
            <input type="input" placeholder="Task Name" name="taskname" value={task.taskname} onChange={handleChange}></input>
            <select className="task-status" name="status" value={task.status} onChange={handleChange} data-testid='select' >
                <option value="" style={{display: "none"}}>Select Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
            </select>
            <select id="select-assignee" name="assignee" value={task.assignee} onChange={handleChange}>
                <option value="Person A">Person A</option>
                <option value="Person B">Person B</option>
                <option value="Person C">Person C</option>
                <option value="Person D">Person D</option>
            </select>
            <button>Add Task</button>
        </form>
    )
}