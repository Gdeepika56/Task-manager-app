import React, { useState, useEffect } from 'react';
import './App.css';
import api from './api/axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({title: '', description: ''});

  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const response =await api.get('tasks/');
        setTasks(response.data);
      }catch(error){
        console.error("error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try{
      const response = await api.post('tasks/', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({title: '', description: ''});
    }catch(error) {
      console.error("Error adding task:", error);
    }
  }

  return(
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}: {task.description}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="title"
          value={newTask.title}
          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          />
          <button onClick ={handleAddTask} > Add Task</button>
      </div>
    </div>
    
          
  );
}

export default App;
