// TaskList.js
// Renders a list of tasks and supports bulk actions
import React from 'react';
import TaskItem from './TaskItem';
function TaskList({ tasks, selected, setSelected, ...actions }) {
  // Toggle selection for bulk actions
  const toggleSelect = idx => {
    setSelected(selected.includes(idx) ? selected.filter(i => i !== idx) : [...selected, idx]);
  };
  return (
    <>
      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="bulk-actions">
          <button onClick={() => actions.onBulkComplete(selected)}>Complete Selected</button>
          <button onClick={() => actions.onBulkDelete(selected)}>Delete Selected</button>
        </div>
      )}
      <ul className="task-list">
        {tasks.map((task, idx) => (
          <div className="task-row" key={idx}>
            <input type="checkbox" checked={selected.includes(idx)} onChange={() => toggleSelect(idx)} />
            <TaskItem
              task={task}
              {...actions.getTaskActions(idx)}
            />
          </div>
        ))}
      </ul>
    </>
  );
}
export default TaskList;
