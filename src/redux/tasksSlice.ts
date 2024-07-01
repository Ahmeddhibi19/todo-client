"use client";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import client from '@/apollo/apolloClient';
import { GET_TASKS_BY_PROJECT_ID,GET_TASK,UPDATE_TASK,CREATE_TASK } from '@/apollo/requests';

type State = "done" | "doing" | "to do";

export interface TaskType {
  id?:number
  title: string;
  description?: string;
  status: State;
  startDate: string;
  dueDate: string;
  projectId:number|undefined
}

interface AppState {
    task:TaskType | null
    tasks: TaskType[];
    condition: string;
    statusCondition: State;
    monthCondition: string;
    clickedProjectId: number | null; // New state for clicked project ID
    state: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  }
  

const initialState: AppState = {
  tasks: [],
  condition: 'status',
  statusCondition: 'to do',
  monthCondition: '',
  clickedProjectId: 0,
  task:null,
  state: 'idle',
  error: null,
};
export const fetchTasksByProjectId = createAsyncThunk(
  'tasks/fetchTasksByProjectId',
  async (projectId: number) => {
    const { data } = await client.query({
      query: GET_TASKS_BY_PROJECT_ID,
      variables: { projectId },
    });
    return data.getTasksByProjectId;
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: number) => {
    const { data } = await client.query({
      query: GET_TASK,
      variables: { id: taskId },
    });
    return data.getTask;
  }
);
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: TaskType, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: task.id,
          input: {
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            startDate: task.startDate,
            projectId: task.projectId
          },
        },
      });
      return response.data.updateTask;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskInput: TaskType, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_TASK,
        variables: { input: taskInput },
      });
      return response.data.createTask;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByProjectId.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(fetchTasksByProjectId.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByProjectId.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateTask.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.task = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createTask.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.task = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      });
  },
});


export const { setCondition, setStatusCondition, setMonthCondition, setClickedProjectId ,setTask } = tasksSlice.actions;
export default tasksSlice;
