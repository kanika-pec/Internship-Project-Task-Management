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
    describe ('adding only one field or invalid field', () => {
        it('should not add task without selecting a status', () => {
            render (<MockFragment />);
              
            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: "Task ABC"}});
            
            const buttonEl = screen.getByRole("button", {name: "Add Task"});
            fireEvent.click(buttonEl);

            const headingElement = screen.queryByText("Task ABC");
            expect(headingElement).toBeNull;
        });

        it('should not add task with empty name field', () => {
            render (<MockFragment />);

            const statusEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(statusEl, "In Progress");

            const buttonEl = screen.getByRole("button", {name: "Add Task"});
            fireEvent.click(buttonEl);
            
            const taskEl = screen.queryByDisplayValue("Change Status");
            expect(taskEl).toBeNull;
        });

        it('should not add task with name field made only of white spaces', () => {
            render (<MockFragment />);

            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: " "}});

            const statusEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(statusEl, "Complete");
            
            const buttonEl = screen.getByRole("button", {name: "Add Task"});
            fireEvent.click(buttonEl);
            
            const headingEl = screen.queryByText(" ");
            expect(headingEl).toBeNull;
        });
    
    })

    describe ('adding task with both name and status field', () => {
        it('should add task in To Do column', () => {
            render (<MockFragment />);
   
            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: "Task XYZ"}});

            const statusEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(statusEl, "To Do");
            
            const buttonEl = screen.getByRole("button", {name: "Add Task"});
            fireEvent.click(buttonEl);
            
            const headingEl = screen.getByText("Task XYZ");
            expect(headingEl).toBeInTheDocument;
            
            const colEl = screen.getByTestId(/to do/i);
            expect(colEl).toContainElement(headingEl);

        });

        it('should add task in In Progress column', () => {
            render (<MockFragment />);
   
            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: "Task In Progress"}});

            const statusEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(statusEl, "In Progress");
            
            const buttonEl = screen.getByRole("button", {name: "Add Task"});
            fireEvent.click(buttonEl);
            
            const headingEl = screen.getByText("Task In Progress");
            expect(headingEl).toBeInTheDocument;
            
            const colEl = screen.getByTestId("IN PROGRESS");
            expect(colEl).toContainElement(headingEl);

        });

        it('should add task in Complete column', () => {
            render (<MockFragment />);
   
            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: "My Task"}});

            const statusEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(statusEl, "Complete");
            
            const buttonEl = screen.getByRole("button", {name: "Add Task"});
            fireEvent.click(buttonEl);
            
            const headingEl = screen.getByText("My Task");
            expect(headingEl).toBeInTheDocument;
            
            const colEl = screen.getByTestId(/complete/i);
            expect(colEl).toContainElement(headingEl);

        });
    })

    describe ('display tasks correctly', () => {
        it('should update column count', () => {
            render(<MockFragment />);

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
            render(<MockFragment />);

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
            render(<MockFragment />);

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
            render(<MockFragment />);

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
    it('should delete task from the column', () => {
        render (<MockFragment />);
   
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, {target: {value: "Task P"}});

        const statusEl = screen.getByDisplayValue("Select Status");
        userEvent.selectOptions(statusEl, "Complete");
            
        const buttonEl = screen.getByRole("button", {name: "Add Task"});
        fireEvent.click(buttonEl);
            
        const taskEl = screen.getByTestId("Task P");
        const delButton = within(taskEl).getByText("Delete")
        fireEvent.click(delButton);
        expect(taskEl).not.toBeInTheDocument;  
    })

    it('should reduce column count by 1', () => {
        render (<MockFragment />);
   
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, {target: {value: "Task Q"}});

        const statusEl = screen.getByDisplayValue("Select Status");
        userEvent.selectOptions(statusEl, "To Do");
            
        const buttonEl = screen.getByRole("button", {name: "Add Task"});
        fireEvent.click(buttonEl);
            
        const colE = screen.getByTestId("TO DO");
        const countE = within(colE).getByTestId("col-count");
        expect(countE.textContent).toBe("1");

        const taskEl = screen.getByTestId("Task Q");
        const delButton = within(taskEl).getByText("Delete")
        fireEvent.click(delButton);

        expect(countE.textContent).toBe("0");
        
    })
}) 

describe ('moving a task', () => {
    it('should move task to correct column', () => {
        render (<MockFragment />);
   
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, {target: {value: "Task D"}});

        const statusEl = screen.getByDisplayValue("Select Status");
        userEvent.selectOptions(statusEl, "To Do");
            
        const buttonEl = screen.getByRole("button", {name: "Add Task"});
        fireEvent.click(buttonEl);
            
        const taskEl = screen.getByTestId("Task D");
        const initCol = screen.getByTestId("TO DO");
        expect(initCol).toContainElement(taskEl); 
               
        const changeEl = within(taskEl).getByText("In Progress")
        fireEvent.click(changeEl);

        expect(initCol).not.toContainElement(taskEl); 

        const newCol = screen.getByTestId("IN PROGRESS");
        const newTaskEl = screen.getByTestId("Task D")
        expect(newCol).toContainElement(newTaskEl);   
    })

    it('should update column count accordingly', () => {
        render (<MockFragment />);
   
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, {target: {value: "Task E"}});

        const statusEl = screen.getByDisplayValue("Select Status");
        userEvent.selectOptions(statusEl, "In Progress");
            
        const buttonEl = screen.getByRole("button", {name: "Add Task"});
        fireEvent.click(buttonEl);
            
        const taskEl = screen.getByTestId("Task E");
        const initCol = screen.getByTestId("IN PROGRESS");
        const countE = within(initCol).getByTestId("col-count");
        expect(countE.textContent).toBe("1");
        const newCol = screen.getByTestId("COMPLETE");
        const newColCountE = within(newCol).getByTestId("col-count");
        expect(newColCountE.textContent).toBe("0");

        const changeEl = within(taskEl).getByText("Complete")
        fireEvent.click(changeEl);

        expect(countE.textContent).toBe("0");
        expect(newColCountE.textContent).toBe("1");
   
    })

    it('should display correct options for changing status', () => {
        render (<MockFragment />);
   
        const inputEl = screen.getByRole("textbox");
        fireEvent.change(inputEl, {target: {value: "Task F"}});

        const statusEl = screen.getByDisplayValue("Select Status");
        userEvent.selectOptions(statusEl, "Complete");
            
        const buttonEl = screen.getByRole("button", {name: "Add Task"});
        fireEvent.click(buttonEl);
            
        const taskEl = screen.getByTestId("Task F");
        const changeStatusEl = within(taskEl).getAllByRole("link");
        expect(changeStatusEl[0].textContent).toBe("To Do");
        expect(changeStatusEl[1].textContent).toBe("In Progress");

        const changeEl = within(taskEl).getByText("To Do")
        fireEvent.click(changeEl);

        const newTaskEl = screen.getByTestId("Task F")
        const newChangeStatusEl = within(newTaskEl).getAllByRole("link");
        expect(newChangeStatusEl[0].textContent).toBe("In Progress");
        expect(newChangeStatusEl[1].textContent).toBe("Complete");
        
    })
})
