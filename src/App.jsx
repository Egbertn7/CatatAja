import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

// Helper function untuk localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [currentView, setCurrentView] = useState('list');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setCurrentView('list');
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setTaskToEdit(null);
    setCurrentView('list');
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'completed') return task.completed;
    if (filterStatus === 'incomplete') return !task.completed;
    return true;
  });

  if (!isLoaded) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen  text-white">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="flex gap-2">
            <h2 className=' text-gray-600 font-semibold py-1'>Filter: </h2>
            <button onClick={() => setFilterStatus('all')} className={`filter px-3 py-1 rounded ${filterStatus === 'all' ? ' text-white' : 'bg-gray-200'}`}>Semua</button>
            <button onClick={() => setFilterStatus('incomplete')} className={`filter px-3 py-1 rounded ${filterStatus === 'incomplete' ? ' text-white' : 'bg-gray-200'}`}>Belum Selesai</button>
            <button onClick={() => setFilterStatus('completed')} className={`filter px-3 py-1 rounded ${filterStatus === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Selesai</button>
          </div>
        </div>

        {currentView === 'list' ? (
          <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={(task) => {
              setTaskToEdit(task);
              setCurrentView('form');
            }}
          />
        ) : (
          <TaskForm
            onAddTask={addTask}
            onUpdateTask={updateTask}
            taskToEdit={taskToEdit}
            onCancel={() => {
              setTaskToEdit(null);
              setCurrentView('list');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
