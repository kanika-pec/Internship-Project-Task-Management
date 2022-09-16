import React from "react";

export default function TaskTemplate({taskname, column, id, show, assignee, taskList, setTaskList}) {
    
    function removeTask(){
        setTaskList(prevTaskList => {
            return (prevTaskList.filter (task => (task.id !== id))) 
        })}
    
    function moveTask(taskCol){
        setTaskList(prevTaskList => {                                       //changing state based on which link is clicked
            return (
                prevTaskList.map(task => {
                    return((task.id === id) ?  {...task, col : taskCol} : task)})
            )})}

    return (                                                                //rendering task based on show property and list items based on column 
        <div className="task-template" id={id} data-testid={taskname} style={{display: show ? "block" : "none"}}>    
            <h4 className="task-heading">{taskname}</h4>                              
            <button className="delete" onClick={removeTask}>Delete</button>
            <div className="status-change">
                <button type="button" className="change-status">Change Status</button>
                <ul className="task-status-list">
                    {column !== 1 && <li><a href="#" onClick={() => moveTask(1)}>To Do</a></li>}      
                    {column !== 2 && <li><a href="#" onClick={() => moveTask(2)}>In Progress</a></li>}
                    {column !== 3 && <li><a href="#" onClick={() => moveTask(3)}>Complete</a></li>} 
                </ul>
            </div>
            <p className="task-assignee">{assignee}</p>
        </div>
    )
}