import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(res => setTasks(res.data));
  }, []);

  const addTask = async task => {
    const res = await axios.post(API_URL, task);
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (id, updatedFields) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedFields);
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTask = async id => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="App">
      <h1>📝 To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
