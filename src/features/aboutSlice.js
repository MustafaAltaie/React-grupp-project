import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem('storedLoginData')) || [],
}

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {}
});

export default aboutSlice.reducer;