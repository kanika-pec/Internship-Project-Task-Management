import { render, screen} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Column from './Column';

const mockSetTaskList = jest.fn();

describe('Column tests', () => {
    it('should render the columns', () => {
        render(<Column title="TO DO" taskObjects={[]} taskState={[]} updateList={mockSetTaskList}/>);

        const count = screen.getByTestId("col-count");
        expect(count).toHaveTextContent(0);

        const headingElement = screen.getByText("TO DO");
        expect(headingElement).toBeInTheDocument();
    });
    
});

