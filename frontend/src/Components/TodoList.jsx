import React, { useState, useEffect } from 'react';
import { Check, Pencil, Trash2 } from 'lucide-react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);


  // Handle form submission for adding/editing tasks
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newTask.trim() === '') return;
    
    if (editingId !== null) {
      // Update existing task
      setTasks(tasks.map((task, i) => 
        i === editingId ? { ...task, text: newTask } : task
      ));
      setEditingId(null);
    } else {
      // Add new task
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    
    setNewTask('');
  };

  // Start editing a task
  const startEdit = (index) => {
    setNewTask(tasks[index].text);
    setEditingId(index);
  };

  // Cancel editing
  const cancelEdit = () => {
    setNewTask('');
    setEditingId(null);
  };

  // Toggle task completion status
  const toggleComplete = (index) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#FFFBF4] text-[#11120D] p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-[#11120D]">My Tasks</h1>
        
        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 rounded-md border border-[#D8CFBC] focus:outline-none focus:ring-2 focus:ring-[#565449]"
            />
            <button 
              type="submit"
              className="bg-[#565449] text-white px-4 py-2 rounded-md hover:bg-[#11120D] transition-colors"
            >
              {editingId !== null ? 'Save' : 'Add'}
            </button>
            {editingId !== null && (
              <button 
                type="button" 
                onClick={cancelEdit}
                className="px-4 py-2 border border-[#D8CFBC] rounded-md hover:bg-[#D8CFBC] transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        
        {/* Task List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {tasks.length === 0 ? (
            <div className="py-6 text-center text-[#565449]">
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li 
                  key={index}
                  className="px-4 py-3 border-b border-[#D8CFBC] last:border-b-0 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleComplete(index)}
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        task.completed ? 'bg-[#565449] border-[#565449]' : 'border-[#565449]'
                      }`}
                    >
                      {task.completed && <Check size={12} className="text-white" />}
                    </button>
                    
                    <span className={task.completed ? 'line-through text-[#565449]' : ''}>
                      {task.text}
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(index)}
                      className="p-1 text-[#565449] hover:text-[#11120D]"
                      disabled={task.completed}
                    >
                      <Pencil size={16} />
                    </button>
                    
                    <button
                      onClick={() => deleteTask(index)}
                      className="p-1 text-[#565449] hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Task Counter */}
        {tasks.length > 0 && (
          <div className="mt-4 text-sm text-[#565449] text-right">
            {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;