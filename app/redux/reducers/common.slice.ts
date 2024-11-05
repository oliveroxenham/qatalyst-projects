import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const commonSlice = createSlice({
  initialState,
  name: 'common',
  reducers: {
    hideLoading: (state) => {
      state.loading = false;
    },
    showLoading: (state) => {
      state.loading = true;
    },
  },
});
export const { showLoading, hideLoading } = commonSlice.actions;
export default commonSlice.reducer;
