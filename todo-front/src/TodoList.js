import React, { Component } from 'react';
import TodoItem from './TodoItem';
const APIURL = '/api/todos';



class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  };

  componentWillMount() {
    this.loadTodos();
  };

  loadTodos() {
    fetch(APIURL)
    .then(response => {
      if(!response.ok) {
        if(response.status >=400 && response.status < 500) {
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          let err = {errorMessage: 'PLease try again later; server is not responding'}
          throw err;
        }
      }
      return response.json();
    })
    .then(todos => this.setState({todos}))
  }

  render() {
    const todos = this.state.todos.map(todoItem =>
      <TodoItem
        key = {todoItem._id}
        {...todoItem}
      />
    );
    return (
      <div>
        <h1>Todo List!</h1>
        <ul>
          {todos}
        </ul>
      </div>
    )
  }
}

export default TodoList;
