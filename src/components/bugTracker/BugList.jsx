// src/components/bugTracker/BugList.jsx
import React from 'react';

const BugList = ({ bugs, selectedBugId, onSelectBug }) => {
  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric' 
    });
  };
  
  // Obtener el color de la etiqueta de prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-900 text-red-200';
      case 'medium':
        return 'bg-yellow-900 text-yellow-200';
      case 'low':
        return 'bg-green-900 text-green-200';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };
  
  // Obtener ícono y clase de estado
  const getStatusInfo = (status) => {
    switch (status) {
      case 'solved':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          class: 'text-green-400'
        };
      case 'in-progress':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          class: 'text-blue-400'
        };
      case 'open':
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          class: 'text-yellow-400'
        };
    }
  };

  return (
    <div className="divide-y divide-gray-700">
      {bugs.length > 0 ? (
        bugs.map(bug => {
          const statusInfo = getStatusInfo(bug.status);
          
          return (
            <div 
              key={bug.id}
              className={`p-4 hover:bg-gray-800 transition-colors cursor-pointer ${
                selectedBugId === bug.id ? 'bg-gray-750 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => onSelectBug(bug.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    {statusInfo.icon}
                    <h3 className={`font-medium ${bug.status === 'solved' ? 'line-through text-gray-400' : 'text-white'}`}>
                      {bug.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{bug.description}</p>
                  
                  <div className="flex flex-wrap mt-2 gap-1">
                    {bug.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-end text-xs space-y-1 min-w-fit">
                  <span className={`px-2 py-1 rounded-full ${getPriorityColor(bug.priority)}`}>
                    {bug.priority === 'high' ? 'Alta' : 
                     bug.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                  <span className="text-gray-500">{formatDate(bug.createdAt)}</span>
                </div>
              </div>
              
              {/* Indicador de progreso (solo para bugs en progreso) */}
              {bug.status === 'in-progress' && bug.progress && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-400">Progreso</span>
                    <span className="text-blue-400">{bug.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${bug.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No se encontraron bugs</p>
        </div>
      )}
    </div>
  );
};

export default BugList;