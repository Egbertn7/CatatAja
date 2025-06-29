import { FaCheck, FaUndo, FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">Belum ada tugas.</div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Judul</th>
              <th className="px-4 py-3 text-left">Deskripsi</th>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`border-b ${
                  task.completed ? 'bg-blue-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className={`px-4 py-3 font-medium ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                  {task.title}
                </td>
                <td className={`px-4 py-3 ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}>
                  {task.description || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(task.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center space-y-1 sm:space-x-2 sm:space-y-0 sm:flex sm:justify-center">
                  <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`cursor-pointer text-white p-2 rounded-md text-sm font-medium flex items-center justify-center ${
                      task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                    title={task.completed ? "Batalkan" : "Selesai"}
                  >
                    {task.completed ? <FaUndo /> : <FaCheck />}
                  </button>
                  <button
                    onClick={() => onEdit(task)}
                    className="cursor-pointer text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-sm font-medium flex items-center justify-center"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="cursor-pointer text-white bg-red-500 hover:bg-red-600 p-2 rounded-md text-sm font-medium flex items-center justify-center"
                    title="Hapus"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
