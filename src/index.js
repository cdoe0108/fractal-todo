import React, { useState, useReducer } from 'react';
import { render } from 'react-dom';
import AddTodo from './addTodo.js';
import uuid from 'uuid/v4';
import './style.css';
import {filterReducer} from "./filterReducer";
import {todoReducer} from "./todoReducer";

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Node.js',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Python',
    complete: false,
  },
]

const App = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer,initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL'); 
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState();
  const addTodo = (val) => {
    let newTodo = {
      id: uuid(),
      task: val,
      complete: false,
    };

    dispatchTodo({
      type: 'ADD_TODO',
      newTodo
    })
  }
  const handleCheckboxChange = (val) => {
    dispatchTodo({
      type: val.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: val.id,
    })
  }
  const showComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' });
  }
  const showIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' });
  }
  const showAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  }

  const editItem = todo => {
    setIsEdit(true)
    setEditValue(todo)
  }

  const updateItem = todo => {
    dispatchTodo({
      type: 'EDIT_TODO',
      todo
    })
    setIsEdit(false)
    setEditValue(null)
  }

  const deleteItem = todo => {
    dispatchTodo({
      type: 'DELETE_TODO',
      todo
    })
  }

  const handleEditInput = event => {
    let val = Object.assign({},editValue);
    val.task = event.target.value;
    setEditValue(val)
  }

  const filteredTodos = todo.filter(item => {
    if (filter === 'ALL') {
      return true;
    }

    if (filter === 'COMPLETE' && item.complete) {
      return true;
    }

    if (filter === 'INCOMPLETE' && !item.complete) {
      return true;
    }

    return false;
  });

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <div className="filter-btn">
          <button className="btn btn-sm btn-primary" onClick={showComplete}>Show Complete</button>
          <button className="btn btn-sm btn-primary" onClick={showIncomplete}>Show Incomplete</button>
          <button className="btn btn-sm btn-primary" onClick={showAll}>Show All</button>
        </div>
        <div className="todo-list">
          <ul>
            {filteredTodos.map(item => (
              <li key={item.id} className="todo-list-item">
                <input className="complete-check" type="checkbox" checked={item.complete} onChange=  {() => handleCheckboxChange(item)}/>
                <span className="todo-label">{item.task}</span>
                {!isEdit ? <button className="btn btn-sm" type="submit" onClick={(e) => editItem(item)}>Edit</button> : ''}
                <button className="btn btn-sm btn-secondary" type="submit" onClick={(e) => deleteItem(item)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {!isEdit ?<div className="add-todo-wrapper">
          <AddTodo addMe={addTodo}/>
        </div> : <div className="add-todo-wrapper">
          <input type="text" className="add-todo-field" onChange={handleEditInput} value={editValue.task}/> 
          <button className="btn btn-sm" type="submit" onClick={(e) => updateItem(editValue)}>Save</button>
        </div>}
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));
