import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    obj: {},
    displayModal: false,
    isEdit: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        handleModal: (state, action) => {
            state.obj = action.payload;
            state.displayModal = true;
        },
        handleCloseModal: (state) => {
            state.displayModal = false;
            state.isEdit = false;
        },
        handleEdit: (state, action) => {
            state.isEdit = action.payload;
        }
    }
});

export const { handleModal, handleCloseModal, handleEdit } = modalSlice.actions;

export default modalSlice.reducer;