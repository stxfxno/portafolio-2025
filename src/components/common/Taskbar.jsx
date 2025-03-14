// src/components/common/Taskbar.jsx
import React from 'react';

const Taskbar = ({ apps, openApps, activeApp, onAppClick }) => {
  // Función para obtener la hora actual en formato HH:MM
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Estado para la hora actual
  const [time, setTime] = React.useState(getCurrentTime());

  // Actualizar la hora cada minuto
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm border-b border-gray-700 flex items-center justify-between px-4 z-20">
      {/* Botón de inicio/logo */}
      <div className="flex items-center">
        <button 
          className="text-white hover:bg-gray-700 px-2 py-1 rounded text-sm flex items-center"
          onClick={() => onAppClick('welcome')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Inicio
        </button>
      </div>
      
      {/* Aplicaciones abiertas */}
      <div className="flex space-x-1">
        {openApps.map(appId => {
          const app = apps.find(a => a.id === appId);
          const isActive = activeApp === appId;
          
          if (!app) return null;
          
          return (
            <button 
              key={appId}
              className={`text-sm px-3 py-1 rounded ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => onAppClick(appId)}
            >
              {app.title}
            </button>
          );
        })}
      </div>
      
      {/* Área de sistema (reloj, etc.) */}
      <div className="text-gray-300 text-xs">
        {time}
      </div>
    </div>
  );
};
a
export default Taskbar;