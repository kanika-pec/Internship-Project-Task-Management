import React from "react";
import TaskTemplate from "./TaskTemplate"

export default function Column({title, taskObjects, taskList, setTaskList}){

    const taskElements = taskObjects.map(task => {               //for all state objects filtered by column, creating task JSX        
        return (
            <TaskTemplate 
            key={task.id}
            taskname={task.taskname} 
            column={task.col} 
            id={task.id} 
            show={task.show} 
            taskList={taskList} 
            setTaskList={setTaskList} />
        )})

    return (
        <div className="column" data-testid={title}>
            <div className="header">
                <h5>{title}</h5>
                <h5 data-testid='col-count'>{taskObjects.length}</h5>
            </div>
            <div className="column-body">
                {taskElements}                                           
            </div>
        </div>
    )
}