const Navbar = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className=" font-bold mr-8">📝 To Do App</h1>
        <div className="space-x-2">
          {/* <button
            onClick={() => setCurrentView('list')}
            className={`px-4 py-2 rounded-lg ${
              currentView === 'list' ? 'bg-white text-white' : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            Daftar Tugas
          </button> */}
          <button
            onClick={() => setCurrentView('form')}
            className={`px-4 py-2 rounded-lg ${
              currentView === 'form' ? 'bg-white text-white' : 'bg-blue-500 hover:bg-blue-400'
            }`}
          >
            Tambah Tugas
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
