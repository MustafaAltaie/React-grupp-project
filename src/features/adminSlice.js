import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {}
});

export default adminSlice.reducer;