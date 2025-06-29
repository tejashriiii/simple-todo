import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, Trash2 } from 'lucide-react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    axios.post('http://127.0.0.1:8000/api/tasks/', {
      text: newTask,
      completed: false
    })
    .then(res => {
      setTasks([...tasks, res.data]);
      setNewTask('');
    });
  };

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = { ...task, completed: !task.completed };

    axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, updatedTask)
      .then(res => {
        setTasks(tasks.map(t => t.id === id ? res.data : t));
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
    // god help
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF4] text-[#11120D] p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-[#11120D]">Simple Todo</h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
            className="flex-1 px-4 py-2 rounded-md border border-[#D8CFBC]"
          />
          <button
            type="submit"
            className="bg-[#565449] text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </form>

        <ul className="bg-white rounded-lg shadow-md overflow-hidden">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="px-4 py-3 border-b border-[#D8CFBC] flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    task.completed ? 'bg-[#565449]' : ''
                  }`}
                >
                  {task.completed && <Check size={12} className="text-white" />}
                </button>
                <span className={task.completed ? 'line-through text-[#565449]' : ''}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 text-[#565449] hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
