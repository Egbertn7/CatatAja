import {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  return [storedValue, setValue];
};

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [currentView, setCurrentView] = useState("list");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setCurrentView("list");
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setTaskToEdit(null);
    setCurrentView("list");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task
      )
    );
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-4xl">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="container mx-auto px-4 py-8">
          {currentView === "list" ? (
            <TaskList
              tasks={tasks}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
              onEdit={(task) => {
                setTaskToEdit(task);
                setCurrentView("form");
              }}
            />
          ) : (
            <TaskForm
              onAddTask={addTask}
              onUpdateTask={updateTask}
              taskToEdit={taskToEdit}
              onCancel={() => {
                setTaskToEdit(null);
                setCurrentView("list");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
