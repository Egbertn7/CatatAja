const TaskItem = ({task, onDelete, onToggleComplete, onEdit}) => {
  return (
    <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer flex-shrink-0"
          />
          <div className="min-w-0">
            <span
              className={`block break-words ${
                task.completed
                  ? "line-through text-gray-400 decoration-2 decoration-gray-500"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </span>
            {task.description && (
              <p
                className={`text-sm mt-1 ${
                  task.completed
                    ? "line-through text-gray-400 decoration-1 decoration-gray-400"
                    : "text-gray-600"
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-2 self-end sm:self-auto">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 
                     transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 
                     transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
