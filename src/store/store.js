import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../features/loginSlice';
import aboutReducer from '../features/aboutSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        about: aboutReducer
    }
});