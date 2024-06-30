"use client";
import { configureStore } from '@reduxjs/toolkit';
import  tasksSlice from './tasksSlice';
import projectSlice from './projectReducer' 
import projectSliceArray from './projectsArraySlice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    project:projectSlice.reducer,
    projectArray:projectSliceArray.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
