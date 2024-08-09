import React from 'react';
import MyContext from './myContext';
import store from '../Redux/store';  // Ensure this is correctly imported and defined

export default function MyContextProvider({ children }) {
  return (
    <MyContext.Provider value={{ store }}>
      {children}
    </MyContext.Provider>
  );
}
