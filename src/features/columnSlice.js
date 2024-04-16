import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    columns: JSON.parse(localStorage.getItem('columns')) || []
}

const columnSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        newColumnHandler: (state, action) => {
            const columnName = action.payload;
            let isUsed = state.columns.some(column => column === action.payload);
            isUsed ? alert('Column is already created') :
            state.columns = [...state.columns, columnName];
            localStorage.setItem('columns', JSON.stringify(state.columns));
        },
        deleteColumnHandler: (state, action) => {
            state.columns = state.columns.filter(column => column != action.payload);
            localStorage.setItem('columns', JSON.stringify(state.columns));
        }
    }
});

export const { newColumnHandler, deleteColumnHandler } = columnSlice.actions;

export default columnSlice.reducer;