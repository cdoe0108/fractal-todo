export const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
    });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
    });
    case 'ADD_TODO':
      return state.concat({
        task: action.newTodo.task,
        id: action.newTodo.id,
        complete: action.newTodo.complete,
    });
    case 'DELETE_TODO':
      return state.filter(item => item.id != action.todo.id);
    case 'EDIT_TODO':
      return state.map(item => {
        if (item.id === action.todo.id) { 
          item.task = action.todo.task
        }
        return item; 
    });
    default:
      throw new Error();
  }
};