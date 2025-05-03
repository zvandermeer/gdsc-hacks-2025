import editButton from '../assets/Edit.svg';
import deleteButton from '../assets/delete.svg';

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
          <button><img src={editButton} alt="Edit" className="w-5 h-auto object-contain"/></button>
          <button onClick={onDelete}><img src={deleteButton} alt="Delete" className="w-6 h-auto object-contain"/></button>
        </div>
      </div>
    );
  }
  
  export default TaskItem;
  