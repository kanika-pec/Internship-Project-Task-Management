import React from "react";

export default function FilterTask({ taskList, setTaskList, handleFilter }) {
  const assigneeList = taskList.map((task) => task.assignee);
  const persons = [...new Set(assigneeList)];
  const personsList = persons.map((person) => (
    <option key={person} value={person}>
      {person}
    </option>
  ));

  let filteredList;

  function handleFilter(e) {
    let query = e.target.value;
    filteredList = taskList.filter((task) => task.taskname.includes(query));
    console.log(filteredList);
    // setTaskList(prevTaskList => {
    //     return (
    //         prevTaskList.map (task => {
    //             if (query==="") {
    //                 return ({...task, show: true})         //if empty query, set all task state objects property to show = true
    //             } else if (filterBy==="task") {
    //                 return (
    //                     task.taskname.includes(query) ? task : {...task, show: false}   //if query matches, set the task objects' property to show = false
    //                 )
    //             } else {
    //                 return (
    //                     task.assignee.includes(query) ? task : {...task, show: false}   //if query matches, set the task objects' property to show = false
    //                 )
    //             }
    //         })
    //     )})
  }

  return (
    <div className="filter-area">
      <input
        type="search"
        name="task"
        placeholder="Filter Issues"
        onChange={(e) => handleFilter(e)}
      />
      <select id="select-assignee" name="assignee" onChange={handleFilter}>
        {personsList}
      </select>
    </div>
  );
}
