// src/components/codePlayground/CodePlayground.jsx
import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import codeSamplesData from '../../data/codeSamplesData';

const CodePlayground = () => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'preview', 'split'
  const [language, setLanguage] = useState('javascript');
  
  // Cuando se selecciona una muestra de código, actualizar el editor
  useEffect(() => {
    if (selectedSample) {
      setCode(selectedSample.code);
      setLanguage(selectedSample.language || 'javascript');
      setOutput('');
      setError(null);
    }
  }, [selectedSample]);
  
  // Función para simular la ejecución del código
  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput('');
    
    // Simular un retraso para la ejecución
    setTimeout(() => {
      try {
        // Validar el lenguaje
        if (language === 'javascript') {
          // Para JavaScript, intentar evaluarlo (de forma segura)
          const consoleOutput = [];
          
          // Crear un entorno de sandbox para la ejecución
          const sandbox = `
            try {
              // Capturar console.log
              const originalConsole = console;
              console = {
                ...originalConsole,
                log: function() {
                  const args = Array.from(arguments);
                  consoleOutput.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' '));
                  originalConsole.log(...arguments);
                },
                error: function() {
                  const args = Array.from(arguments);
                  consoleOutput.push('ERROR: ' + args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' '));
                  originalConsole.error(...arguments);
                },
                warn: function() {
                  const args = Array.from(arguments);
                  consoleOutput.push('WARNING: ' + args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' '));
                  originalConsole.warn(...arguments);
                }
              };
              
              ${code}
              
              return { consoleOutput };
            } catch (error) {
              return { error: error.toString() };
            }
          `;
          
          // Intentar ejecutar en una función
          const result = new Function(sandbox)();
          
          if (result.error) {
            setError(result.error);
          } else {
            setOutput(result.consoleOutput.join('\n'));
          }
        } else if (language === 'html') {
          // Para HTML, simplemente mostrarlo en el preview
          setOutput('HTML no produce salida de consola. Revisa la pestaña de Vista Previa.');
        } else {
          // Para otros lenguajes, mostrar un mensaje simulado
          setOutput(`[Simulación] Ejecutando código ${language}...\nEste es un playground simulado para ${language}.`);
        }
      } catch (err) {
        setError(err.toString());
      } finally {
        setIsRunning(false);
      }
    }, 800);
  };
  
  // Función para crear una nueva muestra de código
  const createNewSample = () => {
    setSelectedSample(null);
    setCode('// Escribe tu código aquí\n\n');
    setLanguage('javascript');
    setOutput('');
    setError(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Barra de herramientas */}
      <div className="bg-gray-800 p-3 border-b border-gray-700 flex flex-wrap items-center gap-3">
        {/* Selector de muestras de código */}
        <select
          value={selectedSample ? selectedSample.id : ''}
          onChange={(e) => {
            const sampleId = e.target.value;
            if (sampleId) {
              const sample = codeSamplesData.find(s => s.id === sampleId);
              setSelectedSample(sample);
            } else {
              createNewSample();
            }
          }}
          className="bg-gray-700 border border-gray-600 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Nuevo código --</option>
          <optgroup label="Ejemplos de Código">
            {codeSamplesData.map(sample => (
              <option key={sample.id} value={sample.id}>
                {sample.name}
              </option>
            ))}
          </optgroup>
        </select>
        
        {/* Selector de lenguaje */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="react">React</option>
          <option value="python">Python (Simulado)</option>
        </select>
        
        {/* Modos de visualización */}
        <div className="flex space-x-1 bg-gray-700 rounded-md p-1 ml-auto">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'editor' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Vista
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'split' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('split')}
          >
            Dividido
          </button>
        </div>
        
        {/* Botón de ejecutar */}
        <button
          onClick={runCode}
          disabled={isRunning}
          className={`px-4 py-1 rounded-md text-sm font-medium flex items-center ${
            isRunning 
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-500 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ejecutando...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ejecutar
            </>
          )}
        </button>
      </div>
      
      {/* Área de contenido principal */}
      <div className="flex-grow flex overflow-hidden">
        {/* Editor de código (visible en modos 'editor' y 'split') */}
        {(activeTab === 'editor' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'} h-full overflow-hidden border-r border-gray-700`}>
            <CodeEditor
              code={code}
              language={language}
              onChange={setCode}
            />
          </div>
        )}
        
        {/* Vista previa (visible en modos 'preview' y 'split') */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'} h-full flex flex-col`}>
            <CodePreview
              code={code}
              language={language}
              output={output}
              error={error}
            />
          </div>
        )}
      </div>
      
      {/* Descripción del ejemplo */}
      {selectedSample && (
        <div className="p-3 bg-gray-850 border-t border-gray-700">
          <h3 className="font-medium text-white mb-1">{selectedSample.name}</h3>
          <p className="text-gray-400 text-sm">{selectedSample.description}</p>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;