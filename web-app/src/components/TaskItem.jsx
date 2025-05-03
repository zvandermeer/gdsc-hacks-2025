function TaskItem({ task, onChange, onClick, onDelete }) {
    return (
      <div className="flex justify-between items-center p-3 max-w-md">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={task.checked}
            onChange={onChange}
            onClick={onClick}
            className="border-4 border-black w-10 h-10 rounded-lg accent-black"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-tight text-black">
              {task.duration} • Scheduled For {task.time}
            </p>
            <p className="text-xl text-black">{task.title}</p>
          </div>
        </div>
  
        <div className="flex space-x-2">
          <button className="text-sm" >Edit</button>
          <button className="text-sm" onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  }
  
  export default TaskItem;
  