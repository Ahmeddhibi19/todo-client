"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = "done" | "doing" | "to-do";

export interface TaskType {
id:number
  title: string;
  description?: string;
  status: State;
  startdate: Date;
  dueDate: Date;
}

interface AppState {
    task:TaskType | null
    tasks: TaskType[];
    condition: string;
    statusCondition: State;
    monthCondition: string;
    clickedProjectId: number | null; // New state for clicked project ID
  }
  

const initialState: AppState = {
  tasks: [
    {
        id:1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'to-do',
      startdate: new Date(),
      dueDate: new Date("2024-11-19")
    },
    {
        id:2,
      title: 'Task 2',
      description: 'Description 2',
      status: 'doing',
      startdate: new Date(),
      dueDate: new Date("2024-10-19")
    },
    {
        id:3,
      title: 'Task 3',
      description: 'Description 3',
      status: 'done',
      startdate: new Date(),
      dueDate: new Date("2024-09-19")
    },
    {
        id:4,
        title: 'Task 3',
        description: 'Description 3',
        status: 'doing',
        startdate: new Date(),
        dueDate: new Date("2024-09-19")
      },
      {
        id:5,
        title: 'Task 3',
        description: 'Description 3',
        status: 'to-do',
        startdate: new Date(),
        dueDate: new Date("2024-09-19")
      },
      {
        id:6,
        title: 'Task 3',
        description: 'Description 3',
        status: 'done',
        startdate: new Date(),
        dueDate: new Date("2024-09-19")
      },
      {
        id:7,
        title: 'Task 3',
        description: 'Description 3',
        status: 'to-do',
        startdate: new Date(),
        dueDate: new Date("2024-09-19")
      },
      {
        id:8,
        title: 'Task 3',
        description: 'Description 3',
        status: 'doing',
        startdate: new Date(),
        dueDate: new Date("2024-09-19")
      },
    // Add more tasks as needed...
  ],
  condition: '',
  statusCondition: 'to-do',
  monthCondition: '',
  clickedProjectId: 0,
  task:null
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCondition(state, action: PayloadAction<string>) {
      state.condition = action.payload;
    },
    setStatusCondition(state, action: PayloadAction<State>) {
      state.statusCondition = action.payload;
    },
    setMonthCondition(state, action: PayloadAction<string>) {
      state.monthCondition = action.payload;
    },
    setClickedProjectId(state, action: PayloadAction<number | null>) {
        state.clickedProjectId = action.payload;
      },
      setTask(state,action:PayloadAction<TaskType>){
        state.task=action.payload
      },
      updateTask(state,action:PayloadAction<TaskType>){
        state.task=action.payload
      }
  },
});


export const { setCondition, setStatusCondition, setMonthCondition, setClickedProjectId, updateTask ,setTask } = tasksSlice.actions;
export default tasksSlice;
