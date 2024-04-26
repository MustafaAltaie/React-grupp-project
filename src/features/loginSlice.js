import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    loginDatabase: JSON.parse(localStorage.getItem('storedLoginData')) || [],
    signupState: true,
    isLogedin: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: nanoid(),
                userName: action.payload.userName,
                email: action.payload.email,
                password: action.payload.password,
                imageUrl: action.payload.imageUrl || 'https://cdn-icons-png.flaticon.com/512/4042/4042171.png',
                joinDate: new Date().toLocaleDateString()
            };
            state.signupState = !state.loginDatabase.some(data => data.email === newUser.email);
            if(state.signupState === true){
                state.loginDatabase = [...state.loginDatabase, newUser];
                localStorage.setItem('storedLoginData', JSON.stringify(state.loginDatabase));
            }
            else{
                state.signupState = false;
                alert('The email is already exist');
            }
        },
        signinHandler: (state, action) => {
            state.isLogedin = state.loginDatabase.some(data => 
                data.email === action.payload.email && data.password === action.payload.password
            );
            localStorage.setItem('userAccount', JSON.stringify(state.loginDatabase.filter(user => user.email === action.payload.email)));
        },
        handleLogout: (state) => {
            state.isLogedin = false;
        }
    }
});

export const { addUser, signinHandler, handleLogout } = loginSlice.actions;

export default loginSlice.reducer;