// TaskItem.js
// Represents a single task with actions and subtasks
import React from 'react';
function TaskItem({ task, onEdit, onSaveEdit, onCancelEdit, onToggleComplete, onDelete, onEditText, isEditing, editText, onAddSubtask, onEditSubtask, onToggleSubtask, onDeleteSubtask }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      {/* If editing, show input and save/cancel buttons */}
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={e => onEditText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') onSaveEdit(); }}
            autoFocus
          />
          <button onClick={onSaveEdit}>💾</button>
          <button onClick={onCancelEdit}>❌</button>
        </>
      ) : (
        <>
          {/* Task text and description */}
          <span>{task.text}</span>
          {task.description && <div className="description">{task.description}</div>}
          {/* Subtasks */}
          {task.subtasks && (
            <ul className="subtasks">
              {task.subtasks.map((sub, i) => (
                <li key={i} className={sub.completed ? 'completed' : ''}>
                  <span onClick={() => onToggleSubtask(i)}>{sub.text}</span>
                  <button onClick={() => onEditSubtask(i)}>✏️</button>
                  <button onClick={() => onDeleteSubtask(i)}>❌</button>
                </li>
              ))}
              <li>
                <input type="text" placeholder="Add subtask" onKeyDown={e => { if (e.key === 'Enter') onAddSubtask(e.target.value); }} />
              </li>
            </ul>
          )}
          <div>
            <button onClick={onEdit}>✏️</button>
            {!task.completed && <button onClick={onToggleComplete}>✅</button>}
            <button onClick={onDelete}>❌</button>
          </div>
        </>
      )}
    </li>
  );
}
export default TaskItem;
