import React, {useState} from 'react';

const AddTodo = (props) => {
  const {addMe} = props;
  const [task,setTask] = useState('');
  const handleChange = (event) => {
    setTask(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (task) {
      addMe(task)
    }
    setTask('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input className="add-todo-field" type="text" value={task} onChange={handleChange}/>
      <button className="btn btn-primary" type="submit">Add Todo</button>
    </form>
  );
}
export default AddTodo;