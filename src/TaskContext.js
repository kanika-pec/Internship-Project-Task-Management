import React, { createContext} from "react";
import App from ".\App.js"

export const TaskContext = createContext(null);

export const TaskContextProvider = ({children}) => {
    const [taskList, setTaskList] = React.useState([]);
    const value = {
        taskList, 
        setTaskList,
    };

    return (
        <TaskContext.Provider value={value}>
            <App />
        </TaskContext.Provider>
    );
};

export default TaskContext;