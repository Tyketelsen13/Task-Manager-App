import React, { useState } from 'react';
import './TaskManager.css';
import Tracker from './Tracker';
import TaskList from './TaskList';

// TaskManager component manages all task logic and UI
function TaskManager() {
  // State for all tasks
  const [tasks, setTasks] = useState([]);
  // State for input field
  const [input, setInput] = useState('');
  // State for which tab is active (active/completed)
  const [activeTab, setActiveTab] = useState('active');
  // State for editing a task
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  // State for tracker counts
  const [completedCount, setCompletedCount] = useState(0);
  const [addedCount, setAddedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  // State for selected tasks (bulk actions)
  const [selected, setSelected] = useState([]);
  // State for tracker collapse (responsive)
  const [trackerCollapsed, setTrackerCollapsed] = useState(false);
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Add a new task with description and subtasks
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty tasks
    setTasks([...tasks, { text: input, completed: false, description: '', subtasks: [] }]);
    setInput('');
    setAddedCount(addedCount + 1); // Update tracker
  };

  // Toggle a task's completed status
  const handleToggleComplete = (index) => {
    const newTasks = [...tasks];
    if (!newTasks[index].completed) {
      setCompletedCount(completedCount + 1); // Increment completed count
    } else {
      setCompletedCount(completedCount - 1); // Decrement if un-completing
    }
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    setDeletedCount(deletedCount + 1); // Update tracker
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Start editing a task
  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  // Save edited task
  const handleSaveEdit = (index) => {
    if (!editText.trim()) return; // Prevent empty edits
    const newTasks = [...tasks];
    newTasks[index].text = editText;
    setTasks(newTasks);
    setEditIndex(null);
    setEditText('');
  };

  // Bulk complete selected tasks
  const handleBulkComplete = (indices) => {
    const newTasks = tasks.map((task, i) => indices.includes(i) ? { ...task, completed: true } : task);
    setTasks(newTasks);
    setCompletedCount(completedCount + indices.filter(i => !tasks[i].completed).length);
    setSelected([]);
  };

  // Bulk delete selected tasks
  const handleBulkDelete = (indices) => {
    setDeletedCount(deletedCount + indices.length);
    const newTasks = tasks.filter((_, i) => !indices.includes(i));
    setTasks(newTasks);
    setSelected([]);
  };

  // Task actions for TaskItem
  const getTaskActions = idx => ({
    isEditing: editIndex === idx,
    editText,
    onEdit: () => handleEditTask(idx),
    onEditText: setEditText,
    onSaveEdit: () => handleSaveEdit(idx),
    onCancelEdit: () => { setEditIndex(null); setEditText(''); },
    onToggleComplete: () => handleToggleComplete(idx),
    onDelete: () => handleDeleteTask(idx),
    // Subtask actions (to be implemented)
    onAddSubtask: (text) => {},
    onEditSubtask: (subIdx) => {},
    onToggleSubtask: (subIdx) => {},
    onDeleteSubtask: (subIdx) => {},
  });

  // Filter tasks for each tab
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  // Main UI
  return (
    <div className={`task-manager${darkMode ? ' dark' : ''}`}>
      {/* Tracker for completed, added, deleted tasks */}
      <Tracker
        completedCount={completedCount}
        addedCount={addedCount}
        deletedCount={deletedCount}
        collapsed={trackerCollapsed}
        setCollapsed={setTrackerCollapsed}
      />
      {/* Dark mode toggle under tracker */}
      <button className="dark-toggle" onClick={handleToggleDarkMode}>
        {darkMode ? '🌙' : '☀️'}
      </button>
      <h2>Task Manager</h2>
      {/* Tab navigation */}
      <div className="tabs">
        <button
          className={activeTab === 'active' ? 'active' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active Tasks
        </button>
        <button
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => setActiveTab('completed')}
        >
          Completed Tasks
        </button>
      </div>
      {/* Add task form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      {/* Task list for current tab with bulk actions */}
      <TaskList
        tasks={activeTab === 'active' ? activeTasks : completedTasks}
        selected={selected}
        setSelected={setSelected}
        onBulkComplete={handleBulkComplete}
        onBulkDelete={handleBulkDelete}
        getTaskActions={getTaskActions}
      />
    </div>
  );
}

export default TaskManager;
