import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: false,
    header: JSON.parse(localStorage.getItem('headerSettings')) || {},
    tasks: JSON.parse(localStorage.getItem('taskSettings')) || {},
    boards: JSON.parse(localStorage.getItem('boardSettings')) || {}
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        handleMenu: (state, action) => {
            state.menu = action.payload;
        },
        handleHeader: (state, {payload: {logoSize, headerSize, headerColor, textSize, textColor, wordSpace}}) => {
            state.header = {
                ...state.header,
                logoSize,
                headerSize,
                headerColor,
                textSize,
                textColor,
                wordSpace
            }
            localStorage.setItem('headerSettings', JSON.stringify(state.header));
        },
        handleResetHeader: (state) => {
            state.header = {};
            localStorage.removeItem('headerSettings');
        },
        handleTask: (state, {payload: {imageSize, padding, gap, radius, borderSize, borderColor, taskColor}}) => {
            state.tasks = {
                ...state.tasks,
                imageSize,
                padding,
                gap,
                radius,
                borderSize,
                borderColor,
                taskColor
            }
            localStorage.setItem('taskSettings', JSON.stringify(state.tasks));
        },
        handleResetTask: (state) => {
            state.tasks = {};
            localStorage.removeItem('taskSettings');
        },
        handleBoards: (state, {payload: {borderColor, borderSize, boardSize, gap, radius}}) => {
            state.boards = {
                ...state.boards,
                borderColor,
                borderSize,
                boardSize,
                gap,
                radius
            }
            localStorage.setItem('boardSettings', JSON.stringify(state.boards));
        },
        handleResetBoard: (state) => {
            state.boards = {};
            localStorage.removeItem('boardSettings');
        },
        handleReset: (state) => {
            state.header = {};
            localStorage.removeItem('headerSettings');
            state.tasks = {};
            localStorage.removeItem('taskSettings');
            state.boards = {};
            localStorage.removeItem('boardSettings');
        }
    }
});

export const { handleMenu,
    handleHeader,
    handleResetHeader,
    handleTask,
    handleResetTask,
    handleBoards,
    handleResetBoard,
    handleReset
} = settingsSlice.actions;

export default settingsSlice.reducer;