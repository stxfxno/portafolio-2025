// src/components/Desktop.jsx
import React, { useState, useEffect } from 'react';
import Window from './common/Window';
import Terminal from './terminal/Terminal';
import ProjectViewer from './projects/ProjectViewer';
import CodePlayground from './codePlayground/CodePlayground';
import BugTracker from './bugTracker/BugTracker';
import CollaborationDemo from './workspace/CollaborationDemo';
import Taskbar from './common/Taskbar';
import Dock from './common/Dock';
import DesktopIcon from './common/DesktopIcon';
import Welcome from './workspace/Welcome';

const Desktop = () => {
  // Estado para gestionar ventanas abiertas
  const [windows, setWindows] = useState([
    { id: 'welcome', title: 'Bienvenido', component: 'Welcome', isOpen: true, zIndex: 10, position: { x: 100, y: 50 }, size: { width: 600, height: 400 } }
  ]);
  
  // Estado para la ventana activa
  const [activeWindowId, setActiveWindowId] = useState('welcome');
  
  // Lista de aplicaciones disponibles
  const apps = [
    { id: 'terminal', title: 'Terminal', icon: 'terminal-icon.svg', component: 'Terminal' },
    { id: 'projects', title: 'Proyectos', icon: 'projects-icon.svg', component: 'ProjectViewer' },
    { id: 'code', title: 'Playground', icon: 'code-icon.svg', component: 'CodePlayground' },
    { id: 'bugtracker', title: 'Bug Tracker', icon: 'bug-icon.svg', component: 'BugTracker' },
    { id: 'collaboration', title: 'Colaboración', icon: 'collab-icon.svg', component: 'CollaborationDemo' }
  ];
  
  // Función para abrir una nueva ventana
  const openWindow = (appId) => {
    const app = apps.find(app => app.id === appId);
    if (!app) return;
    
    // Comprobar si la ventana ya está abierta
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      // Si ya está abierta, activarla
      setActiveWindowId(appId);
      setWindows(windows.map(w => ({
        ...w,
        zIndex: w.id === appId ? Math.max(...windows.map(w => w.zIndex)) + 1 : w.zIndex,
        isOpen: w.id === appId ? true : w.isOpen
      })));
      return;
    }
    
    // Calcular posición para nueva ventana (escalonada)
    const offset = windows.length * 30;
    const newWindow = {
      id: appId,
      title: app.title,
      component: app.component,
      isOpen: true,
      zIndex: Math.max(...windows.map(w => w.zIndex), 0) + 1,
      position: { x: 100 + offset, y: 50 + offset },
      size: { width: 700, height: 500 }
    };
    
    setWindows([...windows, newWindow]);
    setActiveWindowId(appId);
  };
  
  // Función para cerrar una ventana
  const closeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isOpen: false } : w));
    
    // Activar la siguiente ventana disponible
    const openWindows = windows.filter(w => w.isOpen && w.id !== id);
    if (openWindows.length > 0) {
      const topWindow = openWindows.reduce((prev, curr) => 
        prev.zIndex > curr.zIndex ? prev : curr
      );
      setActiveWindowId(topWindow.id);
    } else {
      setActiveWindowId(null);
    }
  };
  
  // Función para activar una ventana
  const activateWindow = (id) => {
    setActiveWindowId(id);
    setWindows(windows.map(w => ({
      ...w,
      zIndex: w.id === id ? Math.max(...windows.map(w => w.zIndex)) + 1 : w.zIndex
    })));
  };
  
  // Función para mover una ventana
  const moveWindow = (id, newPosition) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position: newPosition } : w
    ));
  };
  
  // Función para cambiar tamaño de una ventana
  const resizeWindow = (id, newSize) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, size: newSize } : w
    ));
  };
  
  // Renderizar el componente adecuado según su tipo
  const renderComponent = (componentName) => {
    switch (componentName) {
      case 'Welcome':
        return <Welcome openApp={openWindow} />;
      case 'Terminal':
        return <Terminal />;
      case 'ProjectViewer':
        return <ProjectViewer />;
      case 'CodePlayground':
        return <CodePlayground />;
      case 'BugTracker':
        return <BugTracker />;
      case 'CollaborationDemo':
        return <CollaborationDemo />;
      default:
        return <div>Componente no encontrado</div>;
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
      {/* Iconos del escritorio */}
      <div className="grid grid-cols-1 gap-6 p-4 absolute left-4 top-4">
        {apps.map(app => (
          <DesktopIcon 
            key={app.id}
            icon={app.icon}
            title={app.title}
            onClick={() => openWindow(app.id)}
          />
        ))}
      </div>
      
      {/* Ventanas */}
      {windows.filter(w => w.isOpen).map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          isActive={activeWindowId === window.id}
          position={window.position}
          size={window.size}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onActivate={() => activateWindow(window.id)}
          onMove={moveWindow}
          onResize={resizeWindow}
        >
          {renderComponent(window.component)}
        </Window>
      ))}
      
      {/* Dock / Barra de tareas */}
      <Dock 
        apps={apps}
        openApps={windows.filter(w => w.isOpen).map(w => w.id)}
        activeApp={activeWindowId}
        onAppClick={openWindow}
      />
    </div>
  );
};

export default Desktop;