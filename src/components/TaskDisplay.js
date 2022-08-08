import React from "react";
import Column from "./Column";

export default function TaskDisplay({taskList, setTaskList}) {
        
    function countTask(column_num){
        let taskObjects = taskList.filter(taskObj => {
            if (taskObj.col === column_num)
            return taskObj 
        })
        return taskObjects          //task objects for each column
    }
    
    return (
        <div className="task-display">
            <Column key="To Do" title="TO DO" taskObjects={countTask(1)} taskList={taskList} setTaskList={setTaskList} />
            <Column key="In Progress" title="IN PROGRESS" taskObjects={countTask(2)} taskList={taskList} setTaskList={setTaskList} />
            <Column key="Complete" title="COMPLETE" taskObjects={countTask(3)} taskList={taskList} setTaskList={setTaskList}/>
        </div>
    )
}