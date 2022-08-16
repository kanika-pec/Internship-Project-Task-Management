import { render, screen, fireEvent, within} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddNewTask from './components/AddNewTask.js';
import TaskDisplay from './components/TaskDisplay.js';

const MockFragment = () => {
    const [taskList, setTaskList] = React.useState([])
    return (
        <>
            <AddNewTask  taskList={taskList} setTaskList={setTaskList} />
            <TaskDisplay taskList={taskList} setTaskList={setTaskList} />
        </>
    )
}

describe ('adding a task', () => {
    beforeEach(() => {
        render (<MockFragment />);
    })

    describe ('adding only one field or invalid field', () => {
        it('should not add task without selecting a status', () => {
               
            fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task ABC"}});
            fireEvent.click(screen.getByRole("button", {name: "Add Task"}));

            const headingElement = screen.queryByText("Task ABC");
            expect(headingElement).toBeNull;
        });

        it('should not add task with empty name field', () => {
           
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "In Progress");
            fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
            
            const taskEl = screen.queryByDisplayValue("Change Status");
            expect(taskEl).toBeNull;
        });

        it('should not add task with name field made only of white spaces', () => {
            
            fireEvent.change(screen.getByRole("textbox"), {target: {value: " "}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "Complete");
            fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
            
            const headingEl = screen.queryByText(" ");
            expect(headingEl).toBeNull;
        });
    
    })

    describe ('adding task with both name and status field', () => {
        it('should add Task XYZ in To Do column', () => {
            
            fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task XYZ"}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "To Do");
            fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
            
            const headingEl = screen.getByText("Task XYZ");
            expect(headingEl).toBeInTheDocument;
            
            const colEl = screen.getByTestId(/to do/i);
            expect(colEl).toContainElement(headingEl);

        });

        it('should add Task In Progress in In Progress column', () => {
            
            fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task In Progress"}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "In Progress");
            fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
            
            const headingEl = screen.getByText("Task In Progress");
            expect(headingEl).toBeInTheDocument;
            
            const colEl = screen.getByTestId("IN PROGRESS");
            expect(colEl).toContainElement(headingEl);

        });

        it('should add My Task in Complete column', () => {
            
            fireEvent.change(screen.getByRole("textbox"), {target: {value: "My Task"}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "Complete");
            fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
            
            const headingEl = screen.getByText("My Task");
            expect(headingEl).toBeInTheDocument;
            
            const colEl = screen.getByTestId(/complete/i);
            expect(colEl).toContainElement(headingEl);

        });
    })

    describe ('display tasks correctly', () => {
        it('should update column count', () => {
            
            const inputEL = screen.getByPlaceholderText(/task name/i);
            fireEvent.change(inputEL, {target: {value: "Task 1"}});

            const selectEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(selectEl, "Complete");

            const butEl = screen.getByRole("button");
            fireEvent.click(butEl);

            const colEl = screen.getByTestId(/complete/i);
            const countEl = within(colEl).getByTestId("col-count");
            expect(countEl.textContent).toBe("1");
            
            // Adding second element
            fireEvent.change(inputEL, {target: {value: "Task 2"}});
            userEvent.selectOptions(selectEl, "Complete");
            fireEvent.click(butEl);
            expect(countEl.textContent).toBe("2");
        })

        it('should not display To Do option in change status dropdown', () => {
            
            fireEvent.change(screen.getByPlaceholderText("Task Name"), {target: {value: "Task XYZ"}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"),"To Do");
            fireEvent.click(screen.getByRole("button"));

            const taskEl = screen.getByTestId("Task XYZ");
            const linkElements = within(taskEl).getAllByRole("link");
            expect(linkElements.length).toBe(2);
            expect(linkElements[0].textContent).not.toBe("To Do");
            expect(linkElements[1].textContent).not.toBe("To Do");
            expect(linkElements[0].textContent).toBe("In Progress");
            expect(linkElements[1].textContent).toBe("Complete");

        })

        it('should not display In Progress option in change status dropdown', () => {
            
            fireEvent.change(screen.getByPlaceholderText("Task Name"), {target: {value: "Task A"}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"),"In Progress");
            fireEvent.click(screen.getByRole("button"));

            const taskEl = screen.getByTestId("Task A");
            const linkElements = within(taskEl).getAllByRole("link");
            expect(linkElements.length).toBe(2);
            expect(linkElements[0].textContent).not.toBe("In Progress");
            expect(linkElements[1].textContent).not.toBe("In Progress");
            expect(linkElements[0].textContent).toBe("To Do");
            expect(linkElements[1].textContent).toBe("Complete");

        })

        it('should not display Complete option in change status dropdown', () => {
            
            fireEvent.change(screen.getByPlaceholderText("Task Name"), {target: {value: "Task B"}});
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"),"Complete");
            fireEvent.click(screen.getByRole("button"));

            const taskEl = screen.getByTestId("Task B");
            const linkElements = within(taskEl).getAllByRole("link");
            expect(linkElements.length).toBe(2);
            expect(linkElements[0].textContent).not.toBe("Complete");
            expect(linkElements[1].textContent).not.toBe("Complete");
            expect(linkElements[0].textContent).toBe("To Do");
            expect(linkElements[1].textContent).toBe("In Progress");

        })
    })
});

describe ('deleting a task', () => {
    beforeEach(() => {
        render (<MockFragment />);

        fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task P"}});
        userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "Complete");
        fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
    })
    
    it('should delete task from the column', () => {
        
        const taskEl = screen.getByTestId("Task P");
        const delButton = within(taskEl).getByText("Delete")
        fireEvent.click(delButton);
        expect(taskEl).not.toBeInTheDocument;  
    })

    it('should reduce column count by 1', () => {
                   
        const countE = within(screen.getByTestId("COMPLETE")).getByTestId("col-count");
        expect(countE.textContent).toBe("1");

        const delButton = within(screen.getByTestId("Task P")).getByText("Delete")
        fireEvent.click(delButton);

        expect(countE.textContent).toBe("0");
        
    })
}) 

describe ('moving a task', () => {

    beforeEach(() => {
        render (<MockFragment />);

        fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task D"}});
        userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "To Do");
        fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
    })

    it('should move task to correct column', () => {
            
        const taskEl = screen.getByTestId("Task D");
        const initCol = screen.getByTestId("TO DO");
        expect(initCol).toContainElement(taskEl); 
               
        const changeEl = within(taskEl).getByText("In Progress")
        fireEvent.click(changeEl);

        expect(initCol).not.toContainElement(taskEl); 

        const newCol = screen.getByTestId("IN PROGRESS");
        expect(newCol).toContainElement(screen.getByTestId("Task D"));   
    })

    it('should update column count accordingly', () => {
        
        const initCol = screen.getByTestId("TO DO");
        const initColCountE = within(initCol).getByTestId("col-count");
        expect(initColCountE.textContent).toBe("1");
        const newCol = screen.getByTestId("COMPLETE");
        const newColCountE = within(newCol).getByTestId("col-count");
        expect(newColCountE.textContent).toBe("0");

        const changeEl = within(screen.getByTestId("Task D")).getByText("Complete");
        fireEvent.click(changeEl);

        expect(initColCountE.textContent).toBe("0");
        expect(newColCountE.textContent).toBe("1");
   
    })

    it('should display correct options for changing status', () => {
        
        const taskEl = screen.getByTestId("Task D");
        const changeStatusEl = within(taskEl).getAllByRole("link");
        expect(changeStatusEl[0].textContent).toBe("In Progress");
        expect(changeStatusEl[1].textContent).toBe("Complete");

        const changeEl = within(taskEl).getByText("In Progress")
        fireEvent.click(changeEl);
        
        const newChangeStatusEl = within(screen.getByTestId("Task D")).getAllByRole("link");
        expect(newChangeStatusEl[0].textContent).toBe("To Do");
        expect(newChangeStatusEl[1].textContent).toBe("Complete");
        
    })
})
