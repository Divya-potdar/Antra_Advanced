import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time: 0, // Time in seconds
  isActive: false,
  isPaused: false,
};

const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    startTimer: (state) => {
      state.isActive = true;
      state.isPaused = false;
    },
    pauseResumeTimer: (state) => {
      state.isPaused = !state.isPaused;
    },
    resetTimer: (state) => {
      state.isActive = false;
      state.isPaused = false;
      state.time = 0;
    },
    decrementTime: (state) => {
      if (state.time > 0) {
        state.time -= 1;
      }
    },
  },
});

export const { setTime, startTimer, pauseResumeTimer, resetTimer, decrementTime } = countdownSlice.actions;

export default countdownSlice.reducer;
