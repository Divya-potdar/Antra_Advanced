import { useState } from "react";
import Todos from './components/Todos';

export default function App() {

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { 'name': 'Task1', 'id': 1 }, 
    { 'name': 'Task2', 'id': 2 }, 
    { 'name': 'Task3', 'id': 3 }  
  ]);

  function handleSubmit(newTask){
    setTasks([...tasks, { 'name' : newTask, 'id' : tasks.length + 1 }]);
  }

  function handleDelete(id){
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div>
      <input type="text" placeholder="Enter a new task here..." onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={() => handleSubmit(newTask)}>Submit</button> <br />
      <Todos tasks={tasks} handleDelete={handleDelete}/>
    </div>
  );
};