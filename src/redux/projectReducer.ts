import client from '@/apollo/apolloClient';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UPDATE_PROJECT ,GET_PROJECT,CREATE_PROJECT} from '@/apollo/requests';
import { Input } from 'postcss';

interface Project {
  id?: number;
  name: string;
  description: string;
}

interface ProjectState {
  project: Project | null;
  state: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  state:'idle',
  error:null
  
};
export const fetchProjectById = createAsyncThunk(
  'project/getProject',
  async (projectId: number) => {
    const { data } = await client.query({
      query: GET_PROJECT,
      variables: { getProjectId: projectId }, // Match the variable name here
    });
    return data.getProject;
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (project: Project, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: UPDATE_PROJECT,
        variables: {
          updateProjectId: project.id, // Use updateProjectId to match the mutation
          input: {
            name: project.name,
            description: project.description,
          },
        },
      });
      return response.data.updateProject;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectInput: Project, { rejectWithValue }) => {
    try {
      const response = await client.mutate({
        mutation: CREATE_PROJECT,
        variables: {
          input: {
            name: projectInput.name,
            description: projectInput.description,
          },
        },
      });
      return response.data.createProject;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<Project>) {
      state.project = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateProject.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.project = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createProject.pending, (state) => {
        state.state = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.state = 'succeeded';
        state.project = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice;
