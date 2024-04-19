import { configureStore } from '@reduxjs/toolkit';

import loginReducer from '../features/loginSlice';
import adminReducer from '../features/adminSlice';
import taskReducer from '../features/taskSlice';
import columnReducer from '../features/columnSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        admin: adminReducer,
        tasks: taskReducer,
        columns: columnReducer
    }
});