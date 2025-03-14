// src/components/terminal/Terminal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { commands } from '../../data/terminalCommands';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Bienvenido a mi Terminal Personal! Escribe "help" para ver comandos disponibles.' },
    { type: 'system', content: 'Puedes explorar mis proyectos, habilidades y experiencia a través de esta interfaz.' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  
  // Mantener el scroll al final del terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  // Mantener el foco en el input
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  // Ejecutar un comando
  const executeCommand = (cmd) => {
    // Agregar el comando al historial de visualización
    setHistory([...history, { type: 'command', content: `$ ${cmd}` }]);
    
    // Agregar al historial de comandos
    if (cmd.trim() && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== cmd)) {
      setCommandHistory([...commandHistory, cmd]);
    }
    setHistoryIndex(-1);
    
    // Parsear el comando (dividir en comando y argumentos)
    const parts = cmd.trim().split(' ');
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Encontrar y ejecutar el comando
    const command = commands.find(c => c.name === commandName || c.aliases.includes(commandName));
    
    if (!cmd.trim()) {
      // Comando vacío
      return;
    } else if (command) {
      // Comando encontrado
      try {
        const response = command.execute(args);
        if (Array.isArray(response)) {
          setHistory(prev => [...prev, ...response.map(line => ({ type: 'output', content: line }))]);
        } else {
          setHistory(prev => [...prev, { type: 'output', content: response }]);
        }
      } catch (error) {
        setHistory(prev => [...prev, { type: 'error', content: `Error: ${error.message}` }]);
      }
    } else {
      // Comando no encontrado
      setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${commandName}. Type "help" for available commands.` }]);
    }
  };
  
  // Manejar entrada de teclado
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // Navegar hacia atrás en el historial de comandos
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // Navegar hacia adelante en el historial de comandos
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-completar comandos
      if (currentCommand.trim()) {
        const partialCmd = currentCommand.trim().split(' ')[0].toLowerCase();
        const matchingCmds = commands
          .filter(c => c.name.startsWith(partialCmd) || c.aliases.some(a => a.startsWith(partialCmd)))
          .map(c => c.name);
        
        if (matchingCmds.length === 1) {
          setCurrentCommand(matchingCmds[0] + ' ');
        } else if (matchingCmds.length > 1) {
          setHistory(prev => [
            ...prev, 
            { type: 'command', content: `$ ${currentCommand}` },
            { type: 'output', content: `Posibles comandos: ${matchingCmds.join(', ')}` }
          ]);
        }
      }
    }
  };
  
  // Manejar clic en el terminal (enfoca el input)
  const handleTerminalClick = () => {
    inputRef.current.focus();
  };

  return (
    <div 
      className="h-full flex flex-col bg-black font-mono text-sm"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="flex-1 p-2 overflow-auto"
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            className={`mb-1 ${
              item.type === 'system' ? 'text-blue-400' : 
              item.type === 'error' ? 'text-red-400' : 
              item.type === 'command' ? 'text-green-400 font-bold' : 
              'text-gray-300'
            }`}
          >
            {item.content}
          </div>
        ))}
        <div className="flex items-center text-green-400">
          <span className="mr-2 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-green-400"
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;