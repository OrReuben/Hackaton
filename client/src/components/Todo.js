import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';
const Todo = () => {
  const [todos, setTodos] = useState([])
  
  const getTodos = () => {
      axios
      .get('/api/todos')
      .then((res) => {
          if (res.data) {
              setTodos(res.data);
            }
        })
        .catch((err) => console.log(err));
    };
    const deleteTodo = (id) => {
        axios
        .delete(`/api/todos/${id}`)
        .then((res) => {
            if (res.data) {
                getTodos();
            }
        })
        .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTodos();
  }, []);
      return (
          <div>
        <h1>My Todo(s)</h1>
        <Input getTodos={getTodos} />
        <ListTodo todos={todos} deleteTodo={deleteTodo} />
      </div>
    );
}
export default Todo;