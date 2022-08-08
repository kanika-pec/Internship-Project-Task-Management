import { render, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import FilterTask from './FilterTask';

const mockSetTaskList = jest.fn();

describe('FilterTask tests', () => {
    it('renders the filter box', () => {
        render(<FilterTask taskState={[]} updateList={mockSetTaskList}/>);

        const inputElement = screen.getByPlaceholderText('Filter Issues');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("");
    });
    
});