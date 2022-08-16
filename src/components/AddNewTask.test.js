import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNewTask from './AddNewTask.js';
import userEvent from '@testing-library/user-event';

const mockSetTaskList = jest.fn();

describe('AddnewTask tests', () => {

    beforeAll(() => {
        render(<AddNewTask taskState={[]} updateList={mockSetTaskList} />);
    })

    afterAll(() => {
        cleanup();
    })

    describe ('rendering elements correctly', () => {
        it('should render the elements for adding a task', () => {
                
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
            
            const inputEl = screen.getByRole("textbox");
            fireEvent.change(inputEl, {target: {value: "Task ABC"}});
            expect(inputEl.value).toBe("Task ABC");
        })

        it('should input status correctly', () => {
            
            userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "To Do");
            expect(screen.getByText(/to do/i).selected).toBeTruthy();
            expect(screen.getByText(/in progress/i).selected).toBeFalsy();
            expect(screen.getByText(/complete/i).selected).toBeFalsy();
        })

    })
});