import React, { useState, useReducer } from 'react';
import AddTodo from './addTodo.js';
import uuid from 'uuid/v4';
import {filterReducer} from "./filterReducer";
import {todoReducer} from "./todoReducer";

export const TodoBucket = (props) => {
  const { initialTodos, title } = props
  const [todo, dispatchTodo] = useReducer(todoReducer,initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL'); 
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState();
  const [isEditTitle, setEditTitle] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  
  const showTitleInput = () => {
    setEditTitle(true)
  }

  const handleTitleChange = event => {
    setNewTitle(event.target.value)
  }

  const updateTitle = event => {
      setNewTitle(event.target.value)
      setEditTitle(false)
  }
  // add todo
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

  // mark complete or incomplete
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

  // edit todo
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

  const handleEditInput = event => {
    let val = Object.assign({},editValue);
    val.task = event.target.value;
    setEditValue(val)
  }
  
  //delete todo
  const deleteItem = todo => {
    dispatchTodo({
      type: 'DELETE_TODO',
      todo
    })
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
    <div className="bucket-wrapper">
        {!isEditTitle ? 
            <h3 className="bucket-title" onClick={showTitleInput}>{newTitle}</h3> 
            : <input type="text" className="text-field" onChange={handleTitleChange} onBlur={updateTitle} value={newTitle}/>}
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
  );
}