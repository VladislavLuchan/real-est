import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    files: []
  },
  reducers: {
    addFile: (state, action) => {
      state.files.push(action.payload)
    }
  },
});

export const { addFile } = appSlice.actions;

export const selectFiles = (state) => state.files;

export default appSlice.reducer;
