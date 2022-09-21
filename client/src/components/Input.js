import React, { Component, useState } from 'react';
import axios from 'axios';
const Input = (props) => {
    const [action, setAction] = useState('')
    const [error, setError] = useState(false)
  const addTodo = () => {
    const task = { action: action };
    if (task.action && task.action.length > 0) {
        setError(false)
      axios
        .post('/api/todos', task)
        .then((res) => {
          if (res.data) {
            props.getTodos();
            setAction('');
          }
        })
        .catch((err) => console.log(err));
    } else {
      setError(true)
    }
  };
  const handleChange = (e) => {
    e.target.value.length > 0 && setError(false)
    setAction(e.target.value);
  };
    return (
      <div>
        <input type="text" onChange={(e) => {handleChange(e)}} value={action} />
        <button onClick={() => addTodo()}>add todo</button>
        {error && <h6>The Todo field is required</h6>}
      </div>
    );
}
export default Input;