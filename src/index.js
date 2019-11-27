import React, { useState, useReducer } from 'react';
import { render } from 'react-dom';
import { TodoBucket } from './todoBucket';
import './style.css';
import { initialTodosB1 } from "./todoList";
import { initialTodosB2 } from "./todoList";


const App = () => {
  return (
    <div className="wrapper">
      <TodoBucket initialTodos={initialTodosB1} title="Frontend Bucket"/>
      <TodoBucket initialTodos={initialTodosB2} title="Backend Bucket"/>
    </div>
  );
}

render(<App />, document.getElementById('root'));
