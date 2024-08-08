import { configureStore } from '@reduxjs/toolkit';
import countdownReducer from '../Reducers/reducers'; // Adjust import path if necessary

const store = configureStore({
  reducer: {
    countdown: countdownReducer,
  },
});

export default store;
