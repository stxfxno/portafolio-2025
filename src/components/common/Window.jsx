// src/components/common/Window.jsx
import React, { useState, useRef, useEffect } from 'react';

const Window = ({ 
  id, 
  title, 
  children, 
  isActive, 
  position, 
  size, 
  zIndex,
  onClose, 
  onActivate, 
  onMove, 
  onResize 
}) => {
  // Referencias para manejar el drag & drop
  const windowRef = useRef(null);
  const headerRef = useRef(null);
  const resizeRef = useRef(null);
  
  // Estado local para manejar posición y tamaño durante el arrastre
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  
  // Estado para minimizar/maximizar
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size });
  
  // Activar la ventana al hacer clic
  const handleWindowClick = (e) => {
    if (!isActive) {
      onActivate(id);
    }
  };
  
  // Iniciar arrastre de ventana
  const handleDragStart = (e) => {
    e.preventDefault();
    if (isMaximized) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  // Iniciar redimensionamiento
  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMaximized) return;
    
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
    setInitialSize({ ...size });
    setInitialPosition({ ...position });
  };
  
  // Manejar el movimiento durante el arrastre o redimensionamiento
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        onMove(id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        onResize(id, {
          width: Math.max(300, initialSize.width + deltaX),
          height: Math.max(200, initialSize.height + deltaY)
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, id, onMove, onResize, resizeStart, initialSize, initialPosition]);
  
  // Manejar maximizar/restaurar ventana
  const handleMaximize = () => {
    if (!isMaximized) {
      setPreMaximizeState({ position, size });
      onMove(id, { x: 0, y: 0 });
      // Obtener el tamaño de la pantalla para maximizar
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      onResize(id, { width: screenWidth, height: screenHeight });
    } else {
      onMove(id, preMaximizeState.position);
      onResize(id, preMaximizeState.size);
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <div 
      ref={windowRef}
      className={`absolute rounded-lg overflow-hidden shadow-xl border border-gray-700 flex flex-col ${
        isActive ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-700'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
        transition: isDragging || isResizing ? 'none' : 'box-shadow 0.2s ease',
      }}
      onClick={handleWindowClick}
    >
      {/* Barra de título */}
      <div 
        ref={headerRef}
        className={`h-10 flex items-center justify-between px-3 ${
          isActive ? 'bg-gray-800' : 'bg-gray-700'
        }`}
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center">
          <div className="flex space-x-2 mr-3">
            <div 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
            />
            <div 
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Minimizar lógica aquí
              }}
            />
            <div 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
            />
          </div>
          <div className="text-sm font-semibold text-white truncate">{title}</div>
        </div>
      </div>
      
      {/* Contenido de la ventana */}
      <div className="flex-1 bg-gray-900 text-white overflow-auto p-4">
        {children}
      </div>
      
      {/* Controlador de redimensionamiento */}
      <div 
        ref={resizeRef}
        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize"
        onMouseDown={handleResizeStart}
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-400"
        >
          <path 
            d="M22 2L2 22M11 2L2 11M20 13L13 20" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Window;