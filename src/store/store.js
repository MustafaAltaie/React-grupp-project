import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../features/loginSlice';
import adminReducer from '../features/adminSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        admin: adminReducer
    }
});