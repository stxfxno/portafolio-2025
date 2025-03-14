// src/components/codePlayground/CodePreview.jsx
import React, { useRef, useEffect, useState } from 'react';

const CodePreview = ({ code, language, output, error }) => {
  const iframeRef = useRef(null);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'console'
  
  // Actualizar el iframe con el contenido HTML/CSS/JS
  useEffect(() => {
    if (language === 'html' && iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Crear el documento HTML
      iframeDoc.open();
      iframeDoc.write(code);
      iframeDoc.close();
    }
  }, [code, language]);
  
  // Renderizar HTML/CSS para previsualización
  const renderPreview = () => {
    if (language === 'html') {
      return (
        <iframe 
          ref={iframeRef}
          title="preview"
          className="w-full h-full bg-white rounded"
          sandbox="allow-scripts"
        />
      );
    } else if (language === 'css') {
      // Para CSS, mostrar un pequeño ejemplo con el CSS aplicado
      const exampleHTML = `
        <html>
          <head>
            <style>${code}</style>
          </head>
          <body style="padding: 20px;">
            <h1>Ejemplo CSS</h1>
            <p>Este es un párrafo de ejemplo.</p>
            <button>Botón de Ejemplo</button>
            <div class="box" style="margin-top: 20px; width: 100px; height: 100px; background-color: #ccc;"></div>
          </body>
        </html>
      `;
      
      return (
        <iframe 
          ref={iframeRef}
          title="preview"
          className="w-full h-full bg-white rounded"
          srcDoc={exampleHTML}
          sandbox="allow-scripts"
        />
      );
    } else if (language === 'javascript' || language === 'react') {
      // Para JS, mostrar la consola por defecto
      if (activeTab === 'preview') {
        setActiveTab('console');
      }
      
      return (
        <div className="flex items-center justify-center h-full bg-gray-850 text-gray-400">
          <div className="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <p>Para código JavaScript, revisa la pestaña de Consola para ver la salida.</p>
          </div>
        </div>
      );
    } else {
      // Para otros lenguajes simulados
      return (
        <div className="flex items-center justify-center h-full bg-gray-850 text-gray-400">
          <div className="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Previsualización no disponible para {language}.</p>
            <p className="text-sm mt-2">Este playground simula la ejecución de varios lenguajes para demostración.</p>
          </div>
        </div>
      );
    }
  };
  
  // Renderizar la consola de salida
  const renderConsole = () => {
    return (
      <div className="w-full h-full bg-gray-850 text-gray-300 p-4 font-mono text-sm overflow-auto">
        {error ? (
          <div className="text-red-400 whitespace-pre-wrap">{error}</div>
        ) : output ? (
          <div className="whitespace-pre-wrap">{output}</div>
        ) : (
          <div className="text-gray-500 italic">Ejecuta el código para ver la salida aquí.</div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Pestañas de vista */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="flex">
          <button 
            className={`px-4 py-2 text-sm font-medium border-r border-gray-700 ${
              activeTab === 'preview' ? 'bg-gray-750 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Vista Previa
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'console' ? 'bg-gray-750 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('console')}
          >
            Consola
          </button>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex-grow">
        {activeTab === 'preview' ? renderPreview() : renderConsole()}
      </div>
    </div>
  );
};
a
export default CodePreview;