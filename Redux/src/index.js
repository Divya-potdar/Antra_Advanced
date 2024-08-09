import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyContextProvider from './Components/contextProvider';
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MyContextProvider>
    <App />
    </MyContextProvider>
 
);


reportWebVitals();
