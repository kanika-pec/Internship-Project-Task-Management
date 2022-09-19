import React from "react";

const TaskContext = React.createContext();

// export const TaskContextProvider = ({children}) => {
//     const [taskList, setTaskList] = React.useState([]);
//     const value = {
//         taskList, 
//         setTaskList,
//     };

//     return (
//         <TaskContext.Provider value={value}>
//             <App />
//         </TaskContext.Provider>
//     );
// };

export default TaskContext;