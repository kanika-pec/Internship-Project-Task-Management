import React from "react";

export default function AddNewTask({taskList, setTaskList}){
    
    function handleClick(){
        let column_id = document.getElementsByClassName("task-status")[0];
        let selected_col = column_id.selectedIndex;
        let inputEl = document.querySelector("input[type='input']");
        let name_of_task = inputEl.value;
        if ( !name_of_task.trim()) {
            return;
        } else {
            inputEl.value = "";
            column_id.selectedIndex = 0;
            let task_id = taskList.length;
            setTaskList(prevTaskList => {                                                //adding new task object to state
                return [...prevTaskList, {id: task_id, taskname: name_of_task, col: selected_col, show: true}]
            })
        }
    }
    
    return (
        <div className="add-new-task">
            <input type="input" placeholder="Task Name" ></input>
            <select className="task-status" data-testid='select' >
                <option name="status" style={{opacity: 0}}>Select Status</option>
                <option name="todo">To Do</option>
                <option name="progress">In Progress</option>
                <option name="complete">Complete</option>
            </select>
            <button type="button" onClick={handleClick} >Add Task</button>
        </div>
    )
}