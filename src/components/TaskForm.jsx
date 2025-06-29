import { useState, useEffect } from 'react';

const TaskForm = ({ onAddTask, onUpdateTask, taskToEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const taskData = {
      title,
      description,
      completed: taskToEdit ? taskToEdit.completed : false,
      id: taskToEdit?.id || undefined,
      createdAt: taskToEdit?.createdAt || undefined,
    };

    if (taskToEdit) {
      onUpdateTask(taskData);
    } else {
      onAddTask(taskData);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">
        {taskToEdit ? 'Edit Tugas' : 'Tambah Tugas'}
      </h2>
      <div>
        <label className="block text-gray-600 mb-1">Judul</label>
        <input
          type="text"
          className="w-full border border-gray-300 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul tugas"
        />
      </div>
      <div>
        <label className="block text-gray-600 mb-1">Deskripsi</label>
        <textarea
          className="w-full border border-gray-300 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi tugas (opsional)"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {taskToEdit ? 'Perbarui' : 'Tambah'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
