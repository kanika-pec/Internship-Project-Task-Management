import { render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import AddNewTask from './AddNewTask.js';
import userEvent from '@testing-library/user-event';

const mockSetTaskList = jest.fn();

describe('AddnewTask tests', () => {
    describe ('rendering elements correctly', () => {
        it('should render the elements for adding a task', () => {
            render(<AddNewTask taskState={[]} updateList={mockSetTaskList} />);
    
            const inputElement = screen.getByRole('textbox');
            expect(inputElement).toBeInTheDocument();
    
            const selectElement = screen.getByDisplayValue('Select Status');
            expect(selectElement).toBeInTheDocument();
    
            const optionList = screen.getAllByRole('option');
            expect(optionList).toHaveLength(4);
            expect(optionList[0]).not.toBeVisible();
            expect(optionList[1]).toBeVisible();
            expect(optionList[2]).toBeVisible();
            expect(optionList[3]).toBeVisible();
            
            const buttonElement = screen.getByText('Add Task');
            expect(buttonElement).toBeInTheDocument();
        });
    })
    describe ('inputs', () => {
        it('should input task name correctly', () => {
            render(<AddNewTask taskState={[]} updateList={mockSetTaskList}/>)

            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: "Task ABC"}});
            expect(inputEl.value).toBe("Task ABC");
        })
        it('should input status correctly', () => {
            render(<AddNewTask taskState={[]} updateList={mockSetTaskList}/>)

            const statusEl = screen.getByDisplayValue("Select Status");
            userEvent.selectOptions(statusEl, "To Do");
            expect(screen.getByText(/to do/i).selected).toBeTruthy();
            expect(screen.getByText(/in progress/i).selected).toBeFalsy();
            expect(screen.getByText(/complete/i).selected).toBeFalsy();
        })

    })
});