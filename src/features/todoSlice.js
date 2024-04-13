import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loginDatabase: JSON.parse(localStorage.getItem('storedLoginData')) || [
        {
            id: nanoid(),
            userName: 'Mustafa',
            email: 'email',
            password: '44',
            imageUrl: 'https://i.ibb.co/jJrxfjC/01.jpg'
        }
    ],
    signupState: true,
    isLogedin: false
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: action.payload.id,
                userName: action.payload.userName,
                email: action.payload.email,
                password: action.payload.password,
                imageUrl: action.payload.imageUrl
            };
            state.signupState = !state.loginDatabase.some(data => data.email === newUser.email);
            if(state.signupState === true){
                state.loginDatabase = [...state.loginDatabase, newUser];
                localStorage.setItem('storedLoginData', JSON.stringify(state.loginDatabase));
            }
            else state.signupState = false;
        },
        signinHandler: (state, action) => {
            state.isLogedin = state.loginDatabase.some(data => 
                data.email === action.payload.email && data.password === action.payload.password
            )
        }
    }
});

export const { addUser, signinHandler } = todoSlice.actions;

export default todoSlice.reducer;