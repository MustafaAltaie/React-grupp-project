import { configureStore } from '@reduxjs/toolkit';

import taskSlice from '../features/loginSlice';

export const store = configureStore({
    reducer: taskSlice
});