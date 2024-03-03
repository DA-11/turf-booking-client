import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="182079696524-e33h7nvbii0bok2ma4aahrdovbbjm61m.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      </BrowserRouter>
    </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

