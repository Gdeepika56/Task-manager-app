import React, { useState, useEffect } from 'react';
import './App.css';
import api from './api/axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({title: '', description: ''});

//To fetch the tasks from the backend when the component mounts, we can use the useEffect hook.//
const fetchTasks = async () => {
  try{
    const response =await api.get('/api/tasks/');
    setTasks(response.data); //set the tasks state to the data from the response//
  }catch(error){
    console.error("error fetching tasks:", error);
  }
};

useEffect(() => {
    fetchTasks();
  }, []); //The empty array as the second argument to useEffect ensures that the effect runs only once when the component mounts//


//add a new task to the backend//
  const handleAddTask = async () => {
    try{
      await api.post('/api/tasks/', newTask);
      fetchTasks(); //re-fetch the task to reflect the new task//
      setNewTask({ title: '', description:''}) //clear the input fields//
    }catch(error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) =>{
    try{
      await api.delete(`/api/tasks/${taskId}/`);
      fetchTasks();
    }catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  return(
    <div>
      <h1>Task Manager</h1>
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

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}: {task.description}
            {/* Delete button fro each task*/ }
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>   
    </div>        
  );
}

export default App;
