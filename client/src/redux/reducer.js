// redux/reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  error: null,
};

const functionSlice = createSlice({
  name: 'function',
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { setSuccess, setError } = functionSlice.actions;
export default functionSlice.reducer;
