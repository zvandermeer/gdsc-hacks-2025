function TaskItem({task, onChange}) {
    return <div className='flex space-x-4 p-3 max-w-md'>
        <input
            type = "checkbox"
            checked ={task.checked}
            onChange = {onChange}
            className='border-4 border-black w-10 h-10 rounded-lg ml-11 accent-black'
        />
        <div>
            <p className='text-xs font-semibold uppercase tracking-tight text-black'>
                {task.duration} • Scheduled For {task.time}
            </p>
            <p className='text-xl text-black'>{task.title}</p>
        </div>

    </div>
}
export default TaskItem