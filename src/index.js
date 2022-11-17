import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebaseConfig from './firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter,RouterProvider,Route,
} from "react-router-dom";
import Registation from './pages/registation';
import Login from './pages/login';
const router = createBrowserRouter([
  {
    path: "/",element: <Registation/>,
  },
  {
    path: "/login",element: <Login/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
