// Tracker.js
// Displays counts for completed, added, and deleted tasks
function Tracker({ completedCount, addedCount, deletedCount, collapsed, setCollapsed }) {
  return (
    <div className={`tracker${collapsed ? ' collapsed' : ''}`}>
      {/* Collapse/expand button for mobile */}
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '▼' : '▲'}
      </button>
      {!collapsed && (
        <>
          <span>✅ Completed: {completedCount}</span>
          <span>➕ Added: {addedCount}</span>
          <span>❌ Deleted: {deletedCount}</span>
        </>
      )}
    </div>
  );
}
export default Tracker;
