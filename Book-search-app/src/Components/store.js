import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../Slices/bookSlice';
import wishlistReducer from '../Slices/wishListSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
