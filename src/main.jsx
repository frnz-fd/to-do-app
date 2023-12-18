// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import useTodoStore from './assets/components/TodoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App useTodoStore={useTodoStore} />
  </React.StrictMode>,
  
)
