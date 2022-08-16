import React from "react";
import {render, screen, cleanup, fireEvent} from "@testing-library/react";
// import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App.js";

describe('filtering tasks', () => {
    beforeEach(() => {
        render (<App />);

        fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task XYZ"}});
        userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "To Do");
        fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
          
        fireEvent.change(screen.getByRole("textbox"), {target: {value: "Task ABC"}});
        userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "In Progress");
        fireEvent.click(screen.getByRole("button", {name: "Add Task"}));

        fireEvent.change(screen.getByRole("textbox"), {target: {value: "My Task"}});
        userEvent.selectOptions(screen.getByDisplayValue("Select Status"), "Complete");
        fireEvent.click(screen.getByRole("button", {name: "Add Task"}));
    })
    
    describe('display correctly filtered tasks', () => {
                        
        it('should filter Task XYZ of To Do column from all columns', () => {
            
            fireEvent.change(screen.getByPlaceholderText(/filter issues/i), {target: {value: "XYZ"}});
    
            expect(screen.getByTestId("Task ABC")).not.toBeVisible;
            expect(screen.getByTestId("My Task")).not.toBeVisible;
            expect(screen.getByTestId("Task XYZ")).toBeVisible;  
    
            const colE = screen.getByTestId("TO DO");
            expect(colE).toContainElement(screen.getByTestId("Task XYZ"));
    
        })
    
        it('should filter Task ABC of In Progress column from all columns', () => {
            
            fireEvent.change(screen.getByRole("searchbox"), {target: {value: "C"}});
    
            expect(screen.getByTestId("Task ABC")).toBeVisible;
            expect(screen.getByTestId("My Task")).not.toBeVisible;
            expect(screen.getByTestId("Task XYZ")).not.toBeVisible;  
    
            const colE = screen.getByTestId("IN PROGRESS");
            expect(colE).toContainElement(screen.getByTestId("Task ABC"));
    
        })
    
        it('should filter all tasks from all columns', () => {
            
            fireEvent.change(screen.getByRole("searchbox"), {target: {value: "Task"}});
    
            expect(screen.getByTestId("Task ABC")).toBeVisible;
            expect(screen.getByTestId("My Task")).toBeVisible;
            expect(screen.getByTestId("Task XYZ")).toBeVisible;  
    
        })
    })

    describe('display all tasks on deleting filter text', () => {
        it('should display tasks from all columns', () => {
                            
            const filterEl = screen.getByPlaceholderText("Filter Issues");
            fireEvent.change(filterEl, {target: {value: "XYZ"}});
    
            expect(screen.getByTestId("Task ABC")).not.toBeVisible;
            expect(screen.getByTestId("My Task")).not.toBeVisible;
            expect(screen.getByTestId("Task XYZ")).toBeVisible;  
    
            fireEvent.change(filterEl, {target: {value: ""}});
    
            expect(screen.getByTestId("Task ABC")).toBeVisible;
            expect(screen.getByTestId("My Task")).toBeVisible;
            expect(screen.getByTestId("Task XYZ")).toBeVisible;  
        })
    })

    describe('no task matches filter', () => {
        it('should display no task as filter Task in Progress does not match', () => {
                            
            const filterEl = screen.getByPlaceholderText("Filter Issues");
            fireEvent.change(filterEl, {target: {value: "Task in Progress"}});
       
            expect(screen.getByTestId("Task ABC")).not.toBeVisible;
            expect(screen.getByTestId("My Task")).not.toBeVisible;
            expect(screen.getByTestId("Task XYZ")).not.toBeVisible;  
        })

        it('should display no task as filter " " does not match', () => {
                            
            const filterEl = screen.getByPlaceholderText("Filter Issues");
            fireEvent.change(filterEl, {target: {value: " "}});
       
            expect(screen.getByTestId("Task ABC")).not.toBeVisible;
            expect(screen.getByTestId("My Task")).not.toBeVisible;
            expect(screen.getByTestId("Task XYZ")).not.toBeVisible;  
        })
    })

    describe('no filter text added', () => {
        it('should display all tasks from all columns', () => {
                                 
            expect(screen.getByTestId("Task ABC")).toBeVisible;
            expect(screen.getByTestId("My Task")).toBeVisible;
            expect(screen.getByTestId("Task XYZ")).toBeVisible;  
        })
    })

})

