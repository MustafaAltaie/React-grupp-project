import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginDatabase: JSON.parse(localStorage.getItem('storedLoginData')) || [],
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        handleDelete: (state, action) => {
            state.loginDatabase = state.loginDatabase.filter(user => user.id !== action.payload);
            localStorage.setItem('storedLoginData', JSON.stringify(state.loginDatabase));
        },
        handleUpdate: (state, action) => {
            const { id, userName, email } = action.payload;
            const newList = state.loginDatabase.map(user => user.id === id ? {...user, userName, email} : user);
            state.loginDatabase = newList;
            localStorage.setItem('storedLoginData', JSON.stringify(state.loginDatabase));
        }
    }
});

export const { handleDelete, handleUpdate } = adminSlice.actions;

export default adminSlice.reducer;