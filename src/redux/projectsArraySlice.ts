import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Project {
    id: number;
    name: string;
    description: string;
  }
interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSliceArray = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProjectsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure } = projectSliceArray.actions;
export const selectProjects = (state: RootState) => state.projectArray.projects;
export default projectSliceArray;
