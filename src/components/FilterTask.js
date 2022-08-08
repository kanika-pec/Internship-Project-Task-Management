import React from "react";

export default function FilterTask({taskList, setTaskList}){
        
    function filterList() {
        let query = document.querySelector("input[type='search']").value
        setTaskList(prevTaskList => {
            return (
                prevTaskList.map (task => {
                    if (query==="") {
                        return ({...task, show: true})         //if empty query, set all task state objects property to show = true
                    } else if (query !== "") {
                        return (
                            task.taskname.includes(query) ? task : {...task, show: false}   //if query matches, set the task objects' property to show = false
                        )
                    }
                })
            )})
        }
 
    return (
        <div className="filter-area">
            <input type="search" placeholder="Filter Issues" onChange={filterList} />
        </div>
    )
}