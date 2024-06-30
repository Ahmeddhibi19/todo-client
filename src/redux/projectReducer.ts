import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ProjectState {
  project: Project | null;
  loading:boolean;
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  loading:false,
  error:null
  
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<Project>) {
      state.project = action.payload;
    },
    updateProject(state, action: PayloadAction<Project>) {
      state.project = action.payload;
    },
    fetchProjectStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProjectSuccess(state, action: PayloadAction<Project>) {
      state.project = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProject, updateProject } = projectSlice.actions;
export default projectSlice ;
