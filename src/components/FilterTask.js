import React from "react";

export default function FilterTask({taskList, setTaskList}){
    
    function filterList(e, filterBy) {
        let query = e.target.value;
        setTaskList(prevTaskList => {
            return (
                prevTaskList.map (task => {
                    if (query==="") {
                        return ({...task, show: true})         //if empty query, set all task state objects property to show = true
                    } else if (filterBy==="task") {
                        return (
                            task.taskname.includes(query) ? task : {...task, show: false}   //if query matches, set the task objects' property to show = false
                        )
                    } else {
                        return (
                            task.assignee.includes(query) ? task : {...task, show: false}   //if query matches, set the task objects' property to show = false
                        ) 
                    }
                })
            )})
        }

    return (
        <div className="filter-area">
            <input type="search" name="task" placeholder="Filter Issues" onChange={(e) => filterList(e, "task")} />
            <input type="search" name="person" placeholder="Search Assignee" onChange={(e) => filterList(e, "person")} />
        </div>
    )
}