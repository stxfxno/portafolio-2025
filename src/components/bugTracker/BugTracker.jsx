// src/components/bugTracker/BugTracker.jsx
import React, { useState, useEffect } from 'react';
import BugList from './BugList';
import BugDetail from './BugDetail';
import bugsData from '../../data/bugsData';

const BugTracker = () => {
  const [bugs, setBugs] = useState([]);
  const [selectedBugId, setSelectedBugId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'open', 'solved'
  const [search, setSearch] = useState('');
  
  // Cargar los datos de bugs
  useEffect(() => {
    setBugs(bugsData);
  }, []);
  
  // Obtener el bug seleccionado
  const selectedBug = bugs.find(bug => bug.id === selectedBugId);
  
  // Filtrar bugs según criterios
  const filteredBugs = bugs.filter(bug => {
    // Filtrar por estado
    const matchesStatus = 
      filter === 'all' || 
      (filter === 'open' && bug.status !== 'solved') ||
      (filter === 'solved' && bug.status === 'solved');
    
    // Filtrar por término de búsqueda
    const matchesSearch = 
      search === '' ||
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.description.toLowerCase().includes(search.toLowerCase()) ||
      bug.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });
  
  // Ordenar bugs (los más recientes primero, luego por prioridad)
  const sortedBugs = [...filteredBugs].sort((a, b) => {
    // Primero por estado (no resueltos primero)
    if (a.status === 'solved' && b.status !== 'solved') return 1;
    if (a.status !== 'solved' && b.status === 'solved') return -1;
    
    // Luego por prioridad
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Finalmente por fecha (más recientes primero)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  // Manejar selección de bug
  const handleSelectBug = (bugId) => {
    setSelectedBugId(bugId);
  };
  
  // Volver a la lista
  const handleBackToList = () => {
    setSelectedBugId(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Barra de encabezado */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Bug Tracker Personal</h2>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Mostrar:</span>
            <div className="flex space-x-1 bg-gray-700 rounded-md p-1">
              <button 
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
                onClick={() => setFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === 'open' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
                onClick={() => setFilter('open')}
              >
                Pendientes
              </button>
              <button 
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  filter === 'solved' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
                onClick={() => setFilter('solved')}
              >
                Resueltos
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-grow flex overflow-hidden">
        {/* Lista de bugs (visible cuando no hay bug seleccionado o en vista amplia) */}
        <div className={`${selectedBugId ? 'hidden md:block md:w-1/3' : 'w-full'} border-r border-gray-700 flex flex-col`}>
          {/* Barra de búsqueda */}
          <div className="p-3 border-b border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar bugs..."
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Lista de bugs */}
          <div className="flex-grow overflow-auto">
            <BugList 
              bugs={sortedBugs} 
              selectedBugId={selectedBugId}
              onSelectBug={handleSelectBug}
            />
          </div>
          
          {/* Estadísticas */}
          <div className="p-3 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Total: {bugs.length} bugs</span>
              <span>Resueltos: {bugs.filter(bug => bug.status === 'solved').length}</span>
              <span>Pendientes: {bugs.filter(bug => bug.status !== 'solved').length}</span>
            </div>
          </div>
        </div>
        
        {/* Detalle del bug seleccionado */}
        {selectedBugId && (
          <div className="flex-grow md:w-2/3">
            <BugDetail 
              bug={selectedBug} 
              onBack={handleBackToList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BugTracker;