import { configureStore } from '@reduxjs/toolkit';

import taskSlice from '../features/todoSlice';

export const store = configureStore({
    reducer: taskSlice
});